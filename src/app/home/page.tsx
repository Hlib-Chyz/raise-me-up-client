'use client';
import React from 'react';
import {
    currentPageState,
    isShowEditPopupState,
    isShowPopupState,
} from '@/store/selectors/pageSelectors';
import { useDispatch, useSelector } from '@/store/store';
import { getPages } from '@/store/thunks/pageThunks';
import { useEffect } from 'react';
import Buttons from './components/buttons';
import ContentClient from './components/content/content.client';
import ContentServer from './components/content/content.server';
import Header from './components/header';
import PagePopup from './components/page-popup';
import Pagination from './components/pagination';

export default function Home(): React.JSX.Element {
    const dispatch = useDispatch();
    const isShowPopup = useSelector(isShowPopupState);
    const isShowEditPopup = useSelector(isShowEditPopupState);
    const currentPage = useSelector(currentPageState);

    useEffect(() => {
        dispatch(getPages());
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
