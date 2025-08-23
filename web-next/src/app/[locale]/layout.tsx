import '../globals.css';

// import BackgroundLayout from '@/components/layouts/background/background';
import Loading from '@/components/loading/loading';
import Navigation from '@/components/navigation/navigation';
import ErrorHandler from '@/components/error/errorHandler';
import Footer from '@/components/footer/footer';
import Providers from './providers';
import Notifications from '@/components/notifications/notificatins';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Suspense } from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { unstable_setRequestLocale } from 'next-intl/server';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'myHearthPlus',
    description: 'The right place to get healthier!',
}

export function generateStaticParams() {
    return [
        { locale: 'bg' },
        { locale: 'en' },
        { locale: 'uk' },
    ];
}

export default function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode,
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale);

    const messages = useMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="relative text-foreground bg-background overflow-x-hidden text-lg">
                <Providers>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <Navigation />

                        <Notifications></Notifications>

                        <ErrorBoundary errorComponent={ErrorHandler}>
                            <Suspense fallback={<Loading />}>
                                <main className="min-h-screen">
                                    {children}
                                </main>
                            </Suspense>
                        </ErrorBoundary>

                        <Footer></Footer>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    )
}
