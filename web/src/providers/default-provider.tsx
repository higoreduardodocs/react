import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ICustomComponentProps } from '../types/common-type'
import AppContextProvider from '../contexts/app-context'

export default function DefaultProviders({ children }: ICustomComponentProps) {
  const client = new QueryClient()

  return (
    <AppContextProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </AppContextProvider>
  )
}
