"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type ReactNode, type FC } from "react"
import { queryClient } from "@/lib/react-query.client"

interface Props {
	children: ReactNode | ReactNode[]
}

const QueryProvider: FC<Props> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default QueryProvider
