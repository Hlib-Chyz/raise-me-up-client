import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';
import paginationSlice, { IPaginationState } from './slices/paginationSlice';
import dataSlice, { IDataState } from './slices/dataSlice';

export interface IStore {
    pagination: IPaginationState;
    data: IDataState;
}

export const store = configureStore<IStore>({
    reducer: {
        pagination: paginationSlice,
        data: dataSlice,
    },
});

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(selector: () => TSelected): TSelected =>
    useSelectorBase<IStore, TSelected>(selector);
