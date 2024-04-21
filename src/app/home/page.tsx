'use client';
import { fetchPages } from '@/store/slices/pageSlice';
import { useDispatch } from '@/store/store';
import { useEffect } from 'react';
import Buttons from './components/buttons';
import ContentServer from './components/content.server';
import Header from './components/header';
import Pagination from './components/pagination';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);
    return (
        <div>
            <Header />
            <Pagination />
            <ContentServer />
            <Buttons />
            {/* <PagePopup /> */}
        </div>
    );
}
