import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import React from 'react';
import StoreProvider from './StoreProvider';
import './globals.css';
import { Toaster } from 'react-hot-toast';

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
            <StoreProvider>
                <body>
                    <Toaster position="top-center" />
                    {children}
                </body>
            </StoreProvider>
        </html>
    );
}
