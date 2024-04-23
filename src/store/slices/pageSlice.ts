import { IPage, IPageState } from '@/shared/types/page.types';
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    getPages,
    deletePage,
    addPage,
    updatePage,
    addListItem,
    removeListItem,
} from '../thunks/pageThunks';

const initialState: IPageState = {
    pages: [],
    currentPage: null,
    isShowPopup: false,
    isShowEditPopup: false,
};

export const pageSlice = createSlice({
    name: 'page',
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
        builder.addCase(getPages.fulfilled, (state, action) => {
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
