import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message: string }, unknown>) => {
        toast.error(error.response?.data.message || 'Something went wrong');
        return Promise.reject(error);
    },
);
