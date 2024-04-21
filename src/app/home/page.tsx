'use client';
import { fetchPages, isShowPopupState, pagesState } from '@/store/slices/pageSlice';
import { useDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Buttons from './components/buttons';
import Header from './components/header';
import PagePopup from './components/page-popup';
import Pagination from './components/pagination';

export default function Home() {
    const dispatch = useDispatch();
    const isShowPopup = useSelector(isShowPopupState);
    const pages = useSelector(pagesState);
    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);
    return (
        <div>
            {isShowPopup}
            <Header />
            <Pagination />
            {pages.map((page) => (
                <div key={page.name}> {page.name}</div>
            ))}
            {/* <ContentServer /> */}
            <Buttons />
            {isShowPopup ? <PagePopup /> : <></>}
        </div>
    );
}
