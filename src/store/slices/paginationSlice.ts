import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IStore } from '../store';

export interface IPaginationState {
    currentPage: number;
    pages: { name: string; info: string; id: number }[];
}

const initialState: IPaginationState = {
    currentPage: 0,
    pages: [
        { name: 'English', info: 'info English', id: 0 },
        { name: 'NEXT', info: 'info NEXT', id: 1 },
        { name: 'NEST', info: 'info NEST', id: 2 },
        { name: 'Mongodb', info: 'info Mongodb', id: 3 },
        { name: 'Tailwind', info: 'info Tailwind', id: 4 },
        { name: 'Redux', info: 'info Redux', id: 5 },
        { name: 'Tests', info: 'info English', id: 6 },
    ],
};

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (
            state: Draft<IPaginationState>,
            action: PayloadAction<IPaginationState['currentPage']>,
        ) => {
            state.currentPage = action.payload;
        },
    },
});

export const getPaginationState = (state: IStore) => state.pagination;
export const getInfoState = (state: IStore) =>
    state.pagination.pages.find((page) => page.id === state.pagination.currentPage)?.info;

export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
