import { IDataState } from '@/shared/types/data.types';
import { IPageState } from '@/shared/types/page.types';
import {
    Dispatch,
    EnhancedStore,
    StoreEnhancer,
    ThunkDispatch,
    Tuple,
    UnknownAction,
    configureStore,
} from '@reduxjs/toolkit';
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';
import dataSlice from './slices/dataSlice';
import pagesSlice from './slices/pageSlice';

export interface IStore {
    data: IDataState;
    page: IPageState;
}

export const makeStore = (): EnhancedStore<
    IStore,
    UnknownAction,
    Tuple<
        [
            StoreEnhancer<{ dispatch: ThunkDispatch<IStore, undefined, UnknownAction> }>,
            StoreEnhancer,
        ]
    >
> =>
    configureStore<IStore>({
        reducer: {
            data: dataSlice,
            page: pagesSlice,
        },
    });

export type StoreType = ReturnType<typeof makeStore>;
export type AppDispatch = StoreType['dispatch'];

export const useDispatch = (): ThunkDispatch<IStore, undefined, UnknownAction> &
    Dispatch<UnknownAction> => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
    selector: (state: IStore) => TSelected,
): TSelected => useSelectorBase<IStore, TSelected>(selector);
