import { createContext, useContext, createRoot, createSignal } from 'solid-js'
import type { ParentComponent } from 'solid-js'
import { createClientStore } from '@/utils/storage'

const uuid = () => import('uuid')

type CodeDocument = {
	id: string
	index: number
	name: string
	createdAt: Date
	deletedAt: Date | null
	content: string
}

function createCodeDocumentsContext() {
	return createRoot(() => {
		const [error, setError] = createSignal<ErrorEvent>()
		const [store, setStore] = createClientStore<Record<string, CodeDocument>>({
			name: 'code-documents',
			version: 1,
			initialValue: {},
			onError: setError,
			shouldPersist: true,
		})

		const count = () => Object.keys(store).length

		async function create(name: string, index: number): Promise<string> {
			const { v4 } = await uuid()
			const id = v4()

			const document = {
				id,
				name,
				index,
				createdAt: new Date(),
				deletedAt: null,
				content: '',
			}

			setStore({
				...store,
				[id]: document,
			})
			return id
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
			},
		] as const
	})
}

const codeDocumentsContext = createCodeDocumentsContext()
const context = createContext(codeDocumentsContext)

export function useDocuments() {
	return useContext(context)
}

const ProviderCodeDocuments: ParentComponent = (props) => {
	return (
		<context.Provider value={codeDocumentsContext}>
			{props.children}
		</context.Provider>
	)
}

export default ProviderCodeDocuments
