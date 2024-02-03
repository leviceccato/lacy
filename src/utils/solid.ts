import { createRoot, mergeProps, onCleanup } from 'solid-js'

export type ClassProps = { class?: string }

type PickOptionals<TValue> = {
	[TKey in keyof TValue as TValue extends Record<TKey, TValue[TKey]>
		? never
		: TKey]-?: TValue[TKey]
}

/* Make default prop declarations cleaner and more type-safe */
export function defaultProps<
	TProps,
	TdefaultProps extends Partial<PickOptionals<TProps>>,
>(props: TProps, defaultProps: TdefaultProps) {
	return mergeProps(defaultProps, props)
}

/* Similar to defaultProps, except it works for regular objects */
export function defaultValues<
	TObject,
	TDefaultProperties extends Partial<PickOptionals<TObject>>,
>(
	object: TObject,
	defaultProperties: TDefaultProperties,
): Required<TDefaultProperties> & TObject {
	return { ...object, ...defaultProperties } as Required<TDefaultProperties> &
		TObject
}

/* Event listener util that will automatically unregister itself when the component is cleaned up */
export function useEventListener<
	TTarget extends EventTarget,
	TEvent extends keyof EventMap,
>(
	target: TTarget,
	event: TEvent,
	listener: EventListener,
	options?: AddEventListenerOptions,
): void {
	createRoot(() => {
		target.addEventListener(event, listener, options)
		onCleanup(() => {
			target.removeEventListener(event, listener, options)
		})
	})
}
