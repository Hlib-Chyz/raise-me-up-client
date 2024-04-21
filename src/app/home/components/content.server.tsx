import { IPage } from '@/shared/types/page.types';
import Content from './content';

export default async function ContentServer() {
    const response = await fetch('http://localhost:3000/pages');
    if (!response.ok) {
        throw new Error('Failed to fetch pages');
    }
    const pages: IPage[] = await response.json();

    return <Content currentPage={pages[0]} />;
}
