import { axiosInstance } from '@/shared/axios';
import { IPage, IListItem } from '@/shared/types/page.types';
import { IResponse } from '@/shared/types/response.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getPages = createAsyncThunk('pages/getPages', async (): Promise<IPage[]> => {
    const response: IResponse<IPage[]> = await axiosInstance.get('pages');
    return response.data;
});

export const addPage = createAsyncThunk(
    'pages/addPage',
    async (page: Omit<IPage, '_id'>): Promise<IPage> => {
        const response: IResponse<IPage> = await axiosInstance.post('pages', page);
        toast.success('You did it!');
        return response.data;
    },
);

export const deletePage = createAsyncThunk(
    'pages/deletePage',
    async (pageId: string): Promise<string> => {
        const response: IResponse<{ id: string }> = await axiosInstance.delete(`pages/${pageId}`);
        toast.success('You did it!');
        return response.data.id;
    },
);

export const updatePage = createAsyncThunk(
    'pages/updatePage',
    async (page: IPage): Promise<IPage> => {
        const { _id, ...rest } = page;
        const response: IResponse<IPage> = await axiosInstance.put(`pages/${_id}`, rest);
        toast.success('You did it!');
        return response.data;
    },
);

export const addListItem = createAsyncThunk(
    'pages/addListItem',
    async ({ id, item }: { id: string; item: IListItem }): Promise<IPage> => {
        const response: IResponse<IPage> = await axiosInstance.patch(
            `pages/add-list-item/${id}`,
            item,
        );
        toast.success('You did it!');
        return response.data;
    },
);

export const removeListItem = createAsyncThunk(
    'pages/removeListItem',
    async ({ id, item }: { id: string; item: IListItem }): Promise<IPage> => {
        const response: IResponse<IPage> = await axiosInstance.patch(
            `pages/remove-list-item/${id}`,
            item,
        );
        toast.success('You did it!');
        return response.data;
    },
);
