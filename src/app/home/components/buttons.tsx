'use client';
import React from 'react';
import { nextPage, previousPage } from '@/store/actions/pageActions';
import { currentPageIndexState, numberOfPagesState } from '@/store/selectors/pageSelectors';
import { useDispatch, useSelector } from '@/store/store';

export default function Buttons(): React.JSX.Element {
    const dispatch = useDispatch();
    const currentPageIndex = useSelector(currentPageIndexState);
    const numberOfPages = useSelector(numberOfPagesState);
    return (
        <div className="bg-white h-68 flex items-center justify-between border-t border-light-grey fixed bottom-0 left-0 w-full px-16 desktop:px-88">
            <button
                onClick={() => dispatch(previousPage())}
                disabled={currentPageIndex === 0}
                className="secondary-button">
                Previous
            </button>
            <button
                onClick={() => dispatch(nextPage())}
                disabled={currentPageIndex === numberOfPages - 1}
                className="primary-button">
                Next
            </button>
        </div>
    );
}
