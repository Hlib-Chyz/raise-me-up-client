import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import React from 'react';
import StoreProvider from './StoreProvider';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Review 2024',
    description: 'Review 2024',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element {
    return (
        <html lang="en" className={`h-full ${openSans.className}`}>
            <Head>
                <title>Review 2024</title>
                <meta name="description" content="PET project for review" />
                <meta name="keywords" content="review" />
                <meta property="og:title" content="Review 2024" />
                <meta property="og:description" content="PET project for review" />
                <meta property="og:type" content="website" />
            </Head>
            <StoreProvider>
                <body>
                    <Toaster position="top-center" />
                    {children}
                </body>
            </StoreProvider>
        </html>
    );
}
