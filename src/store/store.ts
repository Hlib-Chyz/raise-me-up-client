import { IGithubState } from '@/shared/types/github.types';
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
import { pageSlice } from './slices/pageSlice';
import { githubSlice } from './slices/githubSlice';

export interface IStore {
    github: IGithubState;
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
            github: githubSlice.reducer,
            page: pageSlice.reducer,
        },
    });

export type StoreType = ReturnType<typeof makeStore>;
export type AppDispatch = StoreType['dispatch'];

export const useDispatch = (): ThunkDispatch<IStore, undefined, UnknownAction> &
    Dispatch<UnknownAction> => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
    selector: (state: IStore) => TSelected,
): TSelected => useSelectorBase<IStore, TSelected>(selector);
