'use client'
import CommonContextProvider from '@/context/commonContext/commonContextProvider';
import LoadingContextProvider from '@/context/loadingContext/loadingContextProvider';
import NavigationContextProvider from '@/context/navigationContext/navigationContextProvider';
import UserContextProvider from '@/context/userContext/userContextProvider';
import NotificationContextProvider from '@/context/notificationContext/notificationContextProvider';

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from '@nextui-org/react';
import { match } from '@formatjs/intl-localematcher';

export default function Providers({ children }: { children: React.ReactNode }) {
    const Negotiator = require('negotiator');
    const headers = { 'accept-language': 'en-US,en;q=0.5' };
    const languages = new Negotiator({ headers }).languages();
    const locales = ['en-US', 'bg-BG'];
    const defaultLocale = 'bg-BG';

    match(languages, locales, defaultLocale)

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