import { axiosInstance } from '@/shared/axios';
import { IResponse } from '@/shared/types/response.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getNumberOfCommits = createAsyncThunk('github/commits', async (): Promise<number> => {
    const response: IResponse<number> = await axiosInstance.get('github/commits');
    return response.data;
});
