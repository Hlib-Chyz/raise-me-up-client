'use client';
import { IPage } from '@/shared/types/page.types';
import { currentPageIdState, deletePage, showEditPopup } from '@/store/slices/pageSlice';
import { useDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import Content from './content';

export default function ContentClient({ currentPage }: { currentPage: IPage | null | undefined }) {
    const currentPageId = useSelector(currentPageIdState);
    const dispatch = useDispatch();

    const removePage = () => {
        dispatch(deletePage(currentPageId ?? ''));
    };

    const editPage = () => {
        dispatch(showEditPopup());
    };

    return <Content page={currentPage} editPage={editPage} removePage={removePage} />;
}
