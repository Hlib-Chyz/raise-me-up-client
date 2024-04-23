import { pageSlice } from '../slices/pageSlice';

export const { nextPage, previousPage, setCurrentPage, showPopup, hidePopup, showEditPopup } =
    pageSlice.actions;
