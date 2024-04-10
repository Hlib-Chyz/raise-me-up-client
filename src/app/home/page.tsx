'use client';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import Buttons from './components/buttons';
import Pagination from './components/pagination';
import Content from './components/content';
import Header from './components/header';

export default function Home() {
    return (
        <Provider store={store}>
            <div>
                <Header />
                <Pagination />
                <Content />
                <Buttons />
            </div>
        </Provider>
    );
}
