'use client';
import { getPaginationState, setCurrentPage } from '@/store/slices/paginationSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Buttons() {
    const dispatch = useDispatch();
    const { currentPage, pages } = useSelector(getPaginationState);
    return (
        <div className="bg-white h-68 flex items-center justify-between border-t border-light-grey fixed bottom-0 left-0 w-full px-16 desktop:px-88">
            <button
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                disabled={currentPage === 0}
                className="secondary-button">
                Previous
            </button>
            <button
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                disabled={currentPage === pages.length - 1}
                className="primary-button">
                Next
            </button>
        </div>
    );
}
