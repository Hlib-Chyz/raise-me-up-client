import { IDataState } from '@/shared/types/data.types';
import { IPageState, IPaginationState } from '@/shared/types/page.types';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';
import dataSlice from './slices/dataSlice';
import pagesSlice from './slices/pagesSlice';
import paginationSlice from './slices/paginationSlice';

export interface IStore {
    pagination: IPaginationState;
    data: IDataState;
    page: IPageState;
}

export const makeStore = () =>
    configureStore<IStore>({
        reducer: {
            pagination: paginationSlice,
            data: dataSlice,
            page: pagesSlice,
        },
    });

export type StoreType = ReturnType<typeof makeStore>;
export type AppDispatch = StoreType['dispatch'];

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(selector: () => TSelected): TSelected =>
    useSelectorBase<IStore, TSelected>(selector);
