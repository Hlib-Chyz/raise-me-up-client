import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IStore } from '../store';

export interface IPaginationState {
    currentPage: number;
    pages: { name: string; info: string[]; id: number }[];
}

const initialState: IPaginationState = {
    currentPage: 0,
    pages: [
        { name: 'English', info: ['English 1', 'English 2', 'English 3', 'English 4'], id: 0 },
        { name: 'NEXT', info: ['NEXT 1', 'NEXT 2', 'NEXT 3', 'NEXT 4'], id: 1 },
        { name: 'NEST', info: ['NEST 1', 'NEST 2', 'NEST 3', 'NEST 4'], id: 2 },
        { name: 'Mongodb', info: ['Mongodb 1', 'Mongodb 2', 'Mongodb 3', 'Mongodb 4'], id: 3 },
        { name: 'Tailwind', info: ['Tailwind 1', 'Tailwind 2', 'Tailwind 3', 'Tailwind 4'], id: 4 },
        { name: 'Redux', info: ['Redux 1', 'Redux 2', 'Redux 3', 'Redux 4'], id: 5 },
        { name: 'Tests', info: ['Tests 1', 'Tests 2', 'Tests 3', 'Tests 4'], id: 6 },
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
