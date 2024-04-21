'use client';
import {
    currentPageState,
    fetchPages,
    isShowEditPopupState,
    isShowPopupState,
} from '@/store/slices/pageSlice';
import { useDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Buttons from './components/buttons';
import ContentClient from './components/content.client';
import ContentServer from './components/content.server';
import Header from './components/header';
import PagePopup from './components/page-popup';
import Pagination from './components/pagination';

export default function Home() {
    const dispatch = useDispatch();
    const isShowPopup = useSelector(isShowPopupState);
    const isShowEditPopup = useSelector(isShowEditPopupState);
    const currentPage = useSelector(currentPageState);
    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <Pagination />
            {currentPage ? <ContentClient currentPage={currentPage} /> : <ContentServer />}
            <Buttons />
            {isShowPopup || isShowEditPopup ? <PagePopup /> : <></>}
        </div>
    );
}
