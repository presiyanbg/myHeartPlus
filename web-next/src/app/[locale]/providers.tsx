'use client'

import CommonContextProvider from '@/context/commonContext/commonContextProvider'
import LoadingContextProvider from '@/context/loadingContext/loadingContextProvider'
import NavigationContextProvider from '@/context/navigationContext/navigationContextProvider'
import UserContextProvider from '@/context/userContext/userContextProvider'

import { NextUIProvider } from '@nextui-org/react'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <CommonContextProvider>
                <LoadingContextProvider>
                    <UserContextProvider>
                        <NavigationContextProvider>
                            {children}
                        </NavigationContextProvider>
                    </UserContextProvider>
                </LoadingContextProvider>
            </CommonContextProvider>
        </NextUIProvider>
    )
}