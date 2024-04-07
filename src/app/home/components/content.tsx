'use client';
import { getInfoState } from '@/store/slices/paginationSlice';
import { useSelector } from 'react-redux';

export default function Content() {
    const info = useSelector(getInfoState);
    return (
        <div className="h-64 px-88 flex items-center justify-between border-b border-light-grey">
            {info}
        </div>
    );
}
