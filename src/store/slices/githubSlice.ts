import { IGithubState } from '@/shared/types/github.types';
import { createSlice } from '@reduxjs/toolkit';
import { getNumberOfCommits } from '../thunks/githubThunks';

const initialState: IGithubState = {
    loading: false,
};

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNumberOfCommits.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNumberOfCommits.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(getNumberOfCommits.rejected, (state) => {
                state.loading = false;
            });
    },
});
