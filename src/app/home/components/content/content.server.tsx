import React from 'react';
import { axiosInstance } from '@/shared/axios';
import Content from './content';
import { IResponse } from '@/shared/types/response.types';
import { IPage } from '@/shared/types/page.types';

export default async function ContentServer(): Promise<React.JSX.Element> {
    const response: IResponse<IPage[]> = await axiosInstance.get('pages', {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
    });
    return <Content page={response.data[0]} />;
}
