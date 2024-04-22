'use client';
import { IPage } from '@/shared/types/page.types';
import Content from './content';

export default function ContentClient({
    currentPage,
}: {
    currentPage: IPage | null | undefined;
}): React.JSX.Element {
    return <Content page={currentPage} />;
}
