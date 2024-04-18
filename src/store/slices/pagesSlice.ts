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

export const updatePage = createAsyncThunk('pages/updatePage', async ({ pageId, pageData }) => {
    const response = await fetch(`http://localhost:3000/pages/${pageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
    });
    return response.json();
});

const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        pages: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pages = action.payload;
            })
            .addCase(fetchPages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPage.fulfilled, (state, action) => {
                state.pages.push(action.payload);
            })
            .addCase(deletePage.fulfilled, (state, action) => {
                state.pages = state.pages.filter((page) => page.id !== action.payload);
            })
            .addCase(updatePage.fulfilled, (state, action) => {
                const index = state.pages.findIndex((page) => page.id === action.payload.id);
                state.pages[index] = action.payload;
            });
    },
});

export default pagesSlice.reducer;
