import { FocusTrap } from '@/providers/FocusTrap'
import { usePortal } from '@/providers/Portal'
import { roundByDpr, sleep } from '@/utils/misc'
import { defaultProps } from '@/utils/solid'
import {
	type ComputePositionReturn,
	type VirtualElement,
} from '@floating-ui/dom'
import {
	type Accessor,
	type ParentComponent,
	type Setter,
	Show,
	type Signal,
	createEffect,
	createRoot,
	createSignal,
	createUniqueId,
	onCleanup,
	onMount,
} from 'solid-js'
import { Portal } from 'solid-js/web'
import * as css from './Popover.css'
const importFloatingUi = () => import('@floating-ui/dom')

export type PopoverState = {
	isShown: boolean
}

type Popover = {
	id: string
	groupId?: string
	isShown: Accessor<boolean>
	setIsShown: Setter<boolean>
}

const store = createRoot(() => {
	const [popovers, setPopovers] = createSignal<Popover[]>([])

	function addPopover(id: string, groupId?: string) {
		const [isShown, setIsShown] = createSignal(false)

		setPopovers([
			...popovers(),
			{
				id,
				groupId,
				isShown,
				setIsShown,
			},
		])
	}

	function removePopover(id: string) {
		setPopovers(popovers().filter((p) => p.id !== id))
	}

	function getPopover(id: string): Popover | undefined {
		return popovers().find((p) => p.id === id)
	}

	function isPopoverShown(id: string): Accessor<boolean> {
		const popover = getPopover(id)
		if (!popover) {
			return () => false
		}

		return popover.isShown
	}

	function getOpenGroupMembers(groupId?: string): Popover[] {
		return popovers().filter(
			(p) => p.isShown() && Boolean(groupId) && p.groupId === groupId,
		)
	}

	function setPopoverShown(id: string, isShown: boolean) {
		const popover = getPopover(id)
		if (!popover) {
			return
		}

		for (const groupMember of getOpenGroupMembers(popover.groupId)) {
			groupMember.setIsShown(false)
		}

		popover.setIsShown(isShown)
	}

	return {
		addPopover,
		removePopover,
		isPopoverShown,
		setPopoverShown,
		getOpenGroupMembers,
	}
})

export const Popover: ParentComponent<{
	element: Element | undefined
	virtualElement?: VirtualElement
	state: Signal<PopoverState | undefined>
	when?: boolean | 'hover' | 'click'
	groupId?: string
	hasArrow?: boolean
	hoverDelay?: number
	mount?: string
	onShown?: () => void
	onHidden?: () => void
	onUpdate?: (_: ComputePositionReturn) => void
}> = (rawProps) => {
	const props = defaultProps(rawProps, {
		hoverDelay: 400,
		hasArrow: false,
		mount: 'modal',
	})

	const portal = usePortal()
	const [state, setState] = props.state
	const id = createUniqueId()

	store.addPopover(id, props.groupId)

	let stopAutoUpdate: (() => void) | undefined
	const [contentRef, setContentRef] = createSignal<HTMLDivElement>()
	const [arrowRef, setArrowRef] = createSignal<HTMLDivElement>()
	const [isHovered, setIsHovered] = createSignal(false)
	const [x, setX] = createSignal(0)
	const [y, setY] = createSignal(0)
	const [arrowX, setArrowX] = createSignal(0)
	const [arrowY, setArrowY] = createSignal(0)

	const contentVariant = (): keyof typeof css.contentVariants => {
		return state()?.isShown ? 'shown' : 'hidden'
	}

	const portalMount = () => portal.mounts().get(props.mount)

	function setPopoverShown(to: boolean): void {
		store.setPopoverShown(id, to)
	}

	function handleClick(): void {
		if (props.when === 'click') {
			setPopoverShown(!state()?.isShown)
		}
	}

	async function handleHover(isIn: boolean): Promise<void> {
		setIsHovered(isIn)

		if (props.when === 'hover') {
			await sleep(isHovered() ? props.hoverDelay : 0)
			return setPopoverShown(isHovered())
		}

		if (isHovered() && store.getOpenGroupMembers(props.groupId).length) {
			return setPopoverShown(true)
		}
	}

	function handleHoverOut(): void {
		handleHover(false)
	}

	function handleHoverIn(): void {
		handleHover(true)
	}

	function toggleEventListeners(enabled: boolean): void {
		if (enabled) {
			window.addEventListener('pointerdown', handleClickToClose)
			addIframeListeners()
			window.addEventListener('keydown', handleEscapeToClose)
			return
		}
		window.removeEventListener('pointerdown', handleClickToClose)
		window.removeEventListener('keydown', handleEscapeToClose)
	}

	function hideIfTargetOutside(
		maybeTarget: EventTarget | null,
		maybeWindow: Window | null,
	): void {
		if (!maybeWindow || !(maybeTarget instanceof Node)) {
			return
		}

		const isOutsideReference =
			props.element instanceof Element && !props.element?.contains(maybeTarget)
		const isOutsideContent = !contentRef()?.contains(maybeTarget)

		if (isOutsideReference && isOutsideContent) {
			setPopoverShown(false)
		}
	}

	function addIframeListeners(): void {
		for (const iframe of document.querySelectorAll('iframe')) {
			if (!iframe.contentWindow) {
				return
			}

			iframe.contentWindow.document.addEventListener(
				'click',
				({ target }: Event) => {
					hideIfTargetOutside(target, iframe.contentWindow)
				},
				{
					once: true,
				},
			)
		}
	}

	function handleClickToClose({ target }: Event): void {
		hideIfTargetOutside(target, window)
	}

	function handleEscapeToClose({ key }: KeyboardEvent): void {
		if (key === 'Escape') {
			setPopoverShown(false)
		}
	}

	async function initPopper(): Promise<void> {
		const contentRefValue = contentRef()
		if (!props.element || !contentRefValue) {
			return
		}

		/* Start Floating UI */

		const floatingUi = await importFloatingUi()
		const referenceEl = props.virtualElement ?? props.element

		const middleware = [
			floatingUi.offset(10),
			floatingUi.autoPlacement(),
			floatingUi.shift(),
		]

		const arrowRefValue = arrowRef()
		if (props.hasArrow && arrowRefValue) {
			middleware.push(floatingUi.arrow({ element: arrowRefValue }))
		}

		stopAutoUpdate = floatingUi.autoUpdate(
			referenceEl,
			contentRefValue,
			async (): Promise<void> => {
				const data = await floatingUi.computePosition(
					referenceEl,
					contentRefValue,
					{ middleware },
				)

				setX(roundByDpr(data.x))
				setY(roundByDpr(data.y))
				setArrowX(roundByDpr(data.middlewareData.arrow?.x ?? 0))
				setArrowY(roundByDpr(data.middlewareData.arrow?.y ?? 0))

				props.onUpdate?.(data)
			},
		)
	}

	createEffect(() => {
		if (portalMount() && contentRef() && !stopAutoUpdate) {
			initPopper()
		}
	})

	createEffect(() => {
		setState({
			isShown: store.isPopoverShown(id)(),
		})
	})

	createEffect(() => {
		if (state()?.isShown) {
			toggleEventListeners(true)
			props.onShown?.()
			return
		}
		props.onHidden?.()
		toggleEventListeners(false)
	})

	onMount(() => {
		props.element?.addEventListener('click', handleClick)
		props.element?.addEventListener('focusin', handleHoverIn)
		props.element?.addEventListener('focusout', handleHoverOut)
		props.element?.addEventListener('mouseenter', handleHoverIn)
		props.element?.addEventListener('mouseleave', handleHoverOut)
	})

	onCleanup(() => {
		stopAutoUpdate?.()
		toggleEventListeners(false)
		store.removePopover(id)

		props.element?.removeEventListener('click', handleClick)
		props.element?.removeEventListener('focusin', handleHoverIn)
		props.element?.removeEventListener('focusout', handleHoverOut)
		props.element?.removeEventListener('mouseenter', handleHoverIn)
		props.element?.removeEventListener('mouseleave', handleHoverOut)
	})

	return (
		<Show when={portalMount()}>
			<Portal mount={portalMount()}>
				<div
					class={css.contentVariants[contentVariant()]}
					ref={(ref) => setContentRef(ref)}
					id={id}
					role="tooltip"
					style={`transform: translate(${x()}px, ${y()}px)`}
				>
					<Show when={props.hasArrow}>
						<div
							class={css.arrow}
							ref={(ref) => setArrowRef(ref)}
							style={`transform: translate(${arrowX()}px, ${arrowY()}px)`}
						>
							<div class={css.arrowInner} />
						</div>
					</Show>
					<Show when={state()?.isShown}>
						<FocusTrap when={state()?.isShown || false}>
							{() => props.children}
						</FocusTrap>
					</Show>
				</div>
			</Portal>
		</Show>
	)
}
