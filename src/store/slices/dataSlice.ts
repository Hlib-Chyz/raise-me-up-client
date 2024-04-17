import { IDataState } from '@/shared/types/data.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getNumberOfCommits = createAsyncThunk('data/fetch', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/github/commits');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState: IDataState = {
    loading: false,
};

export const dataSlice = createSlice({
    name: 'data',
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

export default dataSlice.reducer;
