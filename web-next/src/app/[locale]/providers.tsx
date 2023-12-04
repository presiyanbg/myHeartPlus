'use client'

import CommonContextProvider from '@/context/commonContext/commonContextProvider';
import LoadingContextProvider from '@/context/loadingContext/loadingContextProvider';
import NavigationContextProvider from '@/context/navigationContext/navigationContextProvider';
import UserContextProvider from '@/context/userContext/userContextProvider';
import NotificationContextProvider from '@/context/notificationContext/notificationContextProvider';

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from '@nextui-org/react';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
                <CommonContextProvider>
                    <LoadingContextProvider>
                        <UserContextProvider>
                            <NavigationContextProvider>
                                <NotificationContextProvider>
                                    {children}
                                </NotificationContextProvider>
                            </NavigationContextProvider>
                        </UserContextProvider>
                    </LoadingContextProvider>
                </CommonContextProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}