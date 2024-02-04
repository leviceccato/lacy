import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'
import { ScrollArea } from '@/components/ScrollArea'
import { Text } from '@/components/Text'
import { type CodeDocument, useCodeDocuments } from '@/providers/CodeDocuments'
import { useI18n } from '@/providers/I18n'
import { type Component, For, createSignal } from 'solid-js'
import * as css from './Header.css'

export const Header: Component = () => {
	const [t] = useI18n()
	const [
		codeDocuments,
		{ createCodeDocument, activateCodeDocument, deleteCodeDocument },
	] = useCodeDocuments()

	const [isMenuPopoverShown, setIsMenuPopoverShown] = createSignal(false)

	const shownCodeDocuments = () => {
		const docs: CodeDocument[] = []

		for (const doc of Object.values(codeDocuments().value)) {
			if (!doc.deletedAt) {
				docs.push(doc)
			}
		}

		docs.sort((a, b) => a.index - b.index)

		return docs
	}

	return (
		<header class={css.root}>
			<IconButton
				name="menu"
				tooltip={t('menu')}
				button={{
					nativeButton: {
						onClick: () => setIsMenuPopoverShown(!isMenuPopoverShown()),
					},
				}}
			/>
			<ScrollArea class={css.scrollArea}>
				<div class={css.tabContainer}>
					<For each={shownCodeDocuments()}>
						{(doc) => (
							<div class={css.tabButtonWrapper}>
								<Button
									nativeButton={{
										onClick: () => activateCodeDocument(doc.id),
										class:
											css.tabButtonVariant[
												doc.isActive ? 'active' : 'inactive'
											],
									}}
								>
									<Text variant="bodyXs">{doc.name}</Text>
								</Button>
								<IconButton
									name="close"
									tooltip={t('close')}
									button={{
										nativeButton: {
											onClick: () => deleteCodeDocument(doc.id),
											class:
												css.closeTabVariant[
													doc.isActive ? 'active' : 'inactive'
												],
										},
									}}
								/>
							</div>
						)}
					</For>
				</div>
			</ScrollArea>
			<IconButton
				name="add"
				tooltip={t('documentNew')}
				button={{
					nativeButton: {
						onClick: () => createCodeDocument(t('untitled')),
						class: css.addTabButton,
					},
				}}
			/>
		</header>
	)
}
