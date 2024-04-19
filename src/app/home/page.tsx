'use client';
import StoreProvider from '../StoreProvider';
import Buttons from './components/buttons';
import Content from './components/content';
import Header from './components/header';
import PagePopup from './components/page-popup';
import Pagination from './components/pagination';

export default function Home() {
    return (
        <StoreProvider>
            <div>
                <Header />
                <Pagination />
                <Content />
                <Buttons />
                <PagePopup />
            </div>
        </StoreProvider>
    );
}
