'use client';
import {
    getCurrentPageState,
    getPaginationState,
    setCurrentPage,
} from '@/store/slices/paginationSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Pagination() {
    const { currentPage, pages } = useSelector(getPaginationState);
    const currentTab = useSelector(getCurrentPageState);
    const dispatch = useDispatch();
    return (
        <>
            <div className="h-64 px-88 items-center justify-between border-b border-light-grey hidden desktop:flex">
                {pages.map((page, index) => (
                    <React.Fragment key={page._id}>
                        <button
                            onClick={() => dispatch(setCurrentPage(page._id))}
                            className={`flex gap-12 body-medium-bold text-light-grey items-center ${currentPage === page._id ? 'text-purple' : ''}`}>
                            <div
                                className={`h-28 w-28 flex items-center justify-center bg-light-grey text-white rounded-4 ${currentPage === page._id ? 'text-white bg-purple' : ''}`}>
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
                <div className="body-medium-bold">{currentTab?.name}</div>
                <div className="forms-hint">
                    {/* {(currentTab?._id ?? 0) + 1} of {pages.length} */}
                </div>
            </div>
        </>
    );
}
