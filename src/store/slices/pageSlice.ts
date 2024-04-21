import { IPage, IPageState } from '@/shared/types/page.types';
import { Draft, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStore } from '../store';

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
    const response = await fetch('http://localhost:3000/pages');
    if (!response.ok) {
        throw new Error('Failed to fetch pages');
    }
    return response.json();
});

export const addPage = createAsyncThunk('pages/addPage', async (page: Omit<IPage, '_id'>) => {
    const response = await fetch('http://localhost:3000/pages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
    });
    return response.json();
});

export const deletePage = createAsyncThunk('pages/deletePage', async (pageId: string) => {
    const response = await fetch(`http://localhost:3000/pages/${pageId}`, {
        method: 'DELETE',
    });
    const res = await response.json();
    return res.id;
});

export const updatePage = createAsyncThunk('pages/updatePage', async (page: IPage) => {
    const { _id, ...rest } = page;
    const response = await fetch(`http://localhost:3000/pages/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
    });
    return response.json();
});

const initialState: IPageState = {
    pages: [],
    currentPage: null,
    isShowPopup: false,
    isShowEditPopup: false,
};

const pageSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        nextPage: (state: Draft<IPageState>) => {
            for (let i = 0; i < state.pages.length; i++) {
                if (state.currentPage?._id === state.pages[i]._id) {
                    state.currentPage = state.pages[i + 1];
                    break;
                }
            }
        },
        previousPage: (state: Draft<IPageState>) => {
            for (let i = 0; i < state.pages.length; i++) {
                if (state.currentPage?._id === state.pages[i]._id) {
                    state.currentPage = state.pages[i - 1];
                    break;
                }
            }
        },
        setCurrentPage: (state: Draft<IPageState>, action: PayloadAction<IPage['_id']>) => {
            state.currentPage = state.pages.find((page) => page._id === action.payload);
        },
        showPopup: (state: Draft<IPageState>) => {
            state.isShowPopup = true;
        },
        hidePopup: (state: Draft<IPageState>) => {
            state.isShowPopup = false;
            state.isShowEditPopup = false;
        },
        showEditPopup: (state: Draft<IPageState>) => {
            state.isShowEditPopup = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPages.fulfilled, (state, action) => {
            state.pages = action.payload;
            state.currentPage = action.payload[0];
        });
        builder.addCase(deletePage.fulfilled, (state, action: PayloadAction<IPage['_id']>) => {
            state.pages = state.pages.filter((page) => page._id !== action.payload);
            state.currentPage = state.pages[0];
        });
        builder.addCase(addPage.fulfilled, (state, action: PayloadAction<IPage>) => {
            state.pages = [...state.pages, action.payload];
            state.isShowPopup = false;
            state.isShowEditPopup = false;
            state.currentPage = action.payload;
        });
        builder.addCase(updatePage.fulfilled, (state, action: PayloadAction<IPage>) => {
            state.isShowPopup = false;
            state.isShowEditPopup = false;
            state.pages = state.pages.map((page) => {
                if (page._id === action.payload._id) {
                    return action.payload;
                }
                return page;
            });
            state.currentPage = action.payload;
        });
    },
});

export default pageSlice.reducer;

export const { nextPage, previousPage, setCurrentPage, showPopup, hidePopup, showEditPopup } =
    pageSlice.actions;

export const pagesState = (state: IStore) => state.page.pages;
export const isShowPopupState = (state: IStore) => state.page.isShowPopup;
export const isShowEditPopupState = (state: IStore) => state.page.isShowEditPopup;
export const numberOfPagesState = (state: IStore) => state.page.pages.length;
export const currentPageState = (state: IStore) => state.page.currentPage;
export const currentPageIdState = (state: IStore) => state.page.currentPage?._id;
export const currentPageIndexState = (state: IStore) =>
    pagesState(state).findIndex((page) => currentPageState(state)?._id === page._id);
