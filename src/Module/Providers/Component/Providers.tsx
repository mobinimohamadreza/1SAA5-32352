'use client'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import {store} from "@/Module/Store/Store";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <ReduxProvider store={store} >
            <QueryClientProvider client={queryClient}>
                <MantineProvider >
                    {children}
                </MantineProvider>
            </QueryClientProvider>
        </ReduxProvider>
    )
}
