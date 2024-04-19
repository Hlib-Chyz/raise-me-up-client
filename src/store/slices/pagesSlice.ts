import { IPage, IPageState } from '@/shared/types/page.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
    const response = await fetch('http://localhost:3000/pages');
    if (!response.ok) {
        throw new Error('Failed to fetch pages');
    }
    return response.json();
});

export const addPage = createAsyncThunk('pages/addPage', async (pageData) => {
    const response = await fetch('http://localhost:3000/pages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
    });
    return response.json();
});

export const deletePage = createAsyncThunk('pages/deletePage', async (pageId) => {
    await fetch(`http://localhost:3000/pages/${pageId}`, {
        method: 'DELETE',
    });
    return pageId;
});

export const updatePage = createAsyncThunk(
    'pages/updatePage',
    async ({ pageId, pageData }: { pageId: string; pageData: IPage }) => {
        const response = await fetch(`http://localhost:3000/pages/${pageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData),
        });
        return response.json();
    },
);

const initialState: IPageState = {
    pages: [],
};

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPages.fulfilled, (state, action) => {
            state.pages = action.payload;
        });
    },
});

export default pagesSlice.reducer;
