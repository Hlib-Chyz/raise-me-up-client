'use client';
import {
    getCurrentTabState,
    getPaginationState,
    setCurrentPage,
} from '@/store/slices/paginationSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Pagination() {
    const { currentPage, pages } = useSelector(getPaginationState);
    const currentTab = useSelector(getCurrentTabState);
    const dispatch = useDispatch();
    const leftArrowKeyCode = 'ArrowLeft';
    const rightArrowKeyCode = 'ArrowRight';
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === leftArrowKeyCode && currentPage !== 0) {
            dispatch(setCurrentPage(currentPage - 1));
        } else if (e.key === rightArrowKeyCode && currentPage !== pages.length - 1) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };
    return (
        <>
            <div className="h-64 px-88 items-center justify-between border-b border-light-grey hidden desktop:flex">
                {pages.map((page) => (
                    <React.Fragment key={page.id}>
                        <button
                            onKeyDown={(e) => onKeyDown(e as unknown as KeyboardEvent)}
                            onClick={() => dispatch(setCurrentPage(page.id))}
                            className={`flex gap-12 body-medium-bold text-light-grey items-center ${currentPage === page.id ? 'text-purple' : ''}`}>
                            <div
                                className={`h-28 w-28 flex items-center justify-center bg-light-grey text-white rounded-4 ${currentPage === page.id ? 'text-white bg-purple' : ''}`}>
                                {page.id + 1}
                            </div>
                            <div>{page.name}</div>
                        </button>
                        <div
                            className={
                                page.id !== pages.length - 1 ? 'w-42 h-1 bg-light-grey' : ''
                            }></div>
                    </React.Fragment>
                ))}
            </div>
            <div className="h-52 px-16 flex items-center justify-between bg-purple text-white desktop:hidden">
                <div className="body-medium-bold">{currentTab?.name}</div>
                <div className="forms-hint">
                    {(currentTab?.id ?? 0) + 1} of {pages.length}
                </div>
            </div>
        </>
    );
}
