'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

interface ProviderProps {

    children: ReactNode
}

const Providers: FC<ProviderProps> = ({ children }) => {

    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    )
}

export default Providers