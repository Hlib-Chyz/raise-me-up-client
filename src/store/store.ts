import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';
import paginationSlice, { IPaginationState } from './slices/paginationSlice';

export interface IStore {
    pagination: IPaginationState;
}

export const store = configureStore<IStore>({
    reducer: {
        pagination: paginationSlice,
    },
});

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(selector: () => TSelected): TSelected =>
    useSelectorBase<IStore, TSelected>(selector);
