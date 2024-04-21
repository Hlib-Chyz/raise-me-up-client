'use client';
import { IPage } from '@/shared/types/page.types';
import { currentPageIdState, deletePage, showEditPopup } from '@/store/slices/pageSlice';
import { useDispatch, useSelector } from '@/store/store';
import Content from './content';

export default function ContentClient({
    currentPage,
}: {
    currentPage: IPage | null | undefined;
}): React.JSX.Element {
    const currentPageId = useSelector(currentPageIdState);
    const dispatch = useDispatch();

    const removePage = (): void => {
        dispatch(deletePage(currentPageId ?? ''));
    };

    const editPage = (): void => {
        dispatch(showEditPopup());
    };

    return <Content page={currentPage} editPage={editPage} removePage={removePage} />;
}
