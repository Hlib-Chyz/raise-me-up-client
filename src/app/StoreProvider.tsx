'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import React from 'react';
import { StoreType, makeStore } from '@/store/store';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    const storeRef = useRef<StoreType>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
