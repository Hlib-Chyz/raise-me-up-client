'use client';
import {
    currentPageIndexState,
    currentPageState,
    numberOfPagesState,
    pagesState,
    setCurrentPage,
} from '@/store/slices/pageSlice';
import { useDispatch, useSelector } from '@/store/store';
import React from 'react';

export default function Pagination(): React.JSX.Element {
    const pages = useSelector(pagesState);
    const currentPage = useSelector(currentPageState);
    const currentPageIndex = useSelector(currentPageIndexState);
    const numberOfPages = useSelector(numberOfPagesState);
    const dispatch = useDispatch();
    return (
        <>
            <div className="h-64 px-88 items-center justify-between border-b border-light-grey hidden desktop:flex">
                {pages.map((page, index) => (
                    <React.Fragment key={page._id}>
                        <button
                            onClick={() => dispatch(setCurrentPage(page._id))}
                            className={`flex gap-12 body-medium-bold text-light-grey items-center ${currentPage?._id === page._id ? 'text-purple' : ''}`}>
                            <div
                                className={`h-28 w-28 flex items-center justify-center bg-light-grey text-white rounded-4 ${currentPage?._id === page._id ? 'text-white bg-purple' : ''}`}>
                                {index + 1}
                            </div>
                            <div>{page.name}</div>
                        </button>
                        <div
                            className={
                                index !== pages.length - 1 ? 'w-42 h-1 bg-light-grey' : ''
                            }></div>
                    </React.Fragment>
                ))}
            </div>
            <div className="h-52 px-16 flex items-center justify-between bg-purple text-white desktop:hidden">
                <div className="body-medium-bold">{currentPage?.name}</div>
                <div className="forms-hint">
                    {currentPageIndex + 1} of {numberOfPages}
                </div>
            </div>
        </>
    );
}
