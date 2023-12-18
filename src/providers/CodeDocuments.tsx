import { createClientStore } from '@/utils/storage'
import {
	type ParentComponent,
	createContext,
	createRoot,
	createSignal,
	useContext,
} from 'solid-js'

export type CodeDocument = {
	id: string
	index: number
	name: string
	isActive: boolean
	createdAt: Date
	deletedAt: Date | null
	content: string
}

type CodeDocumentStore = Record<string, CodeDocument>

function createCodeDocumentsContext() {
	return createRoot(() => {
		const [error, setError] = createSignal<ErrorEvent>()
		const [store, setStore] = createClientStore<CodeDocumentStore>({
			name: 'code-documents',
			version: 1,
			initialValue: {},
			onError: setError,
			shouldPersist: true,
		})

		const count = () => Object.keys(store().value).length

		async function create(name: string): Promise<string> {
			const id = crypto.randomUUID()

			const document = {
				id,
				name,
				index: count() + 1,
				isActive: false,
				createdAt: new Date(),
				deletedAt: null,
				content: '',
			}

			setStore({
				value: {
					...store().value,
					[id]: document,
				},
			})
			console.log(1, document)
			return id
		}

		function activate(id: string): void {
			const newStore: CodeDocumentStore = {}

			Object.values(store().value).forEach((doc) => {
				const currentId = doc.id
				newStore[currentId] = doc

				newStore[currentId].isActive = newStore[currentId].id === id
			})

			setStore({ value: newStore })
		}

		function _delete(id: string): void {
			const newStore: CodeDocumentStore = { ...store().value }

			newStore[id].deletedAt = new Date()

			setStore({ value: newStore })
		}

		function clearError() {
			setError(undefined)
		}

		return [
			store,
			{
				setCodeDocuments: setStore,
				createCodeDocument: create,
				codeDocumentCount: count,
				codeDocumentsError: error,
				clearCodeDocumentsError: clearError,
				activateCodeDocument: activate,
				deleteCodeDocument: _delete,
			},
		] as const
	})
}

const codeDocumentsContext = createCodeDocumentsContext()
const context = createContext(codeDocumentsContext)

export function useCodeDocuments() {
	return useContext(context)
}

export const ProviderCodeDocuments: ParentComponent = (props) => {
	return (
		<context.Provider value={codeDocumentsContext}>
			{props.children}
		</context.Provider>
	)
}