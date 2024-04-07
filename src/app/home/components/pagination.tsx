'use client';
import { getPaginationState, setCurrentPage } from '@/store/slices/paginationSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Pagination() {
    const { currentPage, pages } = useSelector(getPaginationState);
    const dispatch = useDispatch();
    return (
        <div className="h-64 px-88 flex items-center justify-between border-b border-light-grey">
            {pages.map((page) => (
                <React.Fragment key={page.id}>
                    <button
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
    );
}
