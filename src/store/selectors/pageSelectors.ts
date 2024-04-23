import { IPage } from '@/shared/types/page.types';
import { IStore } from '../store';

export const pagesState = (state: IStore): IPage[] => state.page.pages;
export const isShowPopupState = (state: IStore): boolean => state.page.isShowPopup;
export const isShowEditPopupState = (state: IStore): boolean => state.page.isShowEditPopup;
export const numberOfPagesState = (state: IStore): number => state.page.pages.length;
export const currentPageState = (state: IStore): IPage | null | undefined => state.page.currentPage;
export const currentPageIdState = (state: IStore): string | null | undefined =>
    state.page.currentPage?._id;
export const currentPageIndexState = (state: IStore): number =>
    pagesState(state).findIndex((page) => currentPageState(state)?._id === page._id);
