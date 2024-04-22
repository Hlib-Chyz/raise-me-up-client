import { IListItem, IPage, IPageState } from '@/shared/types/page.types';
import { Draft, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStore } from '../store';
import toast from 'react-hot-toast';

export const fetchPages = createAsyncThunk('pages/fetchPages', async (): Promise<IPage[]> => {
    try {
        const response = await fetch('http://localhost:3000/pages');
        const resBody = await response.json();
        if (!response.ok) {
            throw resBody.message;
        }
        return resBody;
    } catch (e) {
        toast.error(JSON.stringify(e));
        throw e;
    }
});

export const addPage = createAsyncThunk(
    'pages/addPage',
    async (page: Omit<IPage, '_id'>): Promise<IPage> => {
        try {
            const response = await fetch('http://localhost:3000/pages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(page),
            });
            const resBody = await response.json();
            if (!response.ok) {
                throw resBody.message;
            }
            toast.success('You did it!');
            return resBody;
        } catch (e) {
            toast.error(JSON.stringify(e));
            throw e;
        }
    },
);

export const deletePage = createAsyncThunk(
    'pages/deletePage',
    async (pageId: string): Promise<string> => {
        try {
            const response = await fetch(`http://localhost:3000/pages/${pageId}`, {
                method: 'DELETE',
            });
            const resBody = await response.json();
            if (!response.ok) {
                throw resBody.message;
            }
            toast.success('You did it!');
            return resBody.id;
        } catch (e) {
            toast.error(JSON.stringify(e));
            throw e;
        }
    },
);

export const updatePage = createAsyncThunk(
    'pages/updatePage',
    async (page: IPage): Promise<IPage> => {
        try {
            const { _id, ...rest } = page;
            const response = await fetch(`http://localhost:3000/pages/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rest),
            });
            const resBody = await response.json();
            if (!response.ok) {
                throw resBody.message;
            }
            toast.success('You did it!');
            return resBody;
        } catch (e) {
            toast.error(JSON.stringify(e));
            throw e;
        }
    },
);

export const addListItem = createAsyncThunk(
    'pages/addListItem',
    async ({ id, item }: { id: string; item: IListItem }): Promise<IPage> => {
        try {
            const response = await fetch(`http://localhost:3000/pages/add-list-item/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const resBody = await response.json();
            if (!response.ok) {
                throw resBody.message;
            }
            toast.success('You did it!');
            return resBody;
        } catch (e) {
            toast.error(JSON.stringify(e));
            throw e;
        }
    },
);

export const removeListItem = createAsyncThunk(
    'pages/removeListItem',
    async ({ id, item }: { id: string; item: IListItem }): Promise<IPage> => {
        try {
            const response = await fetch(`http://localhost:3000/pages/remove-list-item/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const resBody = await response.json();
            if (!response.ok) {
                throw resBody.message;
            }
            toast.success('You did it!');
            return resBody;
        } catch (e) {
            toast.error(JSON.stringify(e));
            throw e;
        }
    },
);

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
        builder.addCase(addListItem.fulfilled, (state, action: PayloadAction<IPage>) => {
            state.pages = state.pages.map((page) => {
                if (page._id === action.payload._id) {
                    return action.payload;
                }
                return page;
            });
            state.currentPage = action.payload;
        });
        builder.addCase(removeListItem.fulfilled, (state, action: PayloadAction<IPage>) => {
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

export const pagesState = (state: IStore): IPage[] => state.page.pages;
export const isShowPopupState = (state: IStore): boolean => state.page.isShowPopup;
export const isShowEditPopupState = (state: IStore): boolean => state.page.isShowEditPopup;
export const numberOfPagesState = (state: IStore): number => state.page.pages.length;
export const currentPageState = (state: IStore): IPage | null | undefined => state.page.currentPage;
export const currentPageIdState = (state: IStore): string | null | undefined =>
    state.page.currentPage?._id;
export const currentPageIndexState = (state: IStore): number =>
    pagesState(state).findIndex((page) => currentPageState(state)?._id === page._id);
