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
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'myHearthPlus',
    description: 'The right place to get healthier!',
}

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'bg' }];
}

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode,
    params: { locale: any }
}) {
    let messages;

    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang="bg-BG" suppressHydrationWarning>
            <body className="relative text-foreground bg-background">
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
