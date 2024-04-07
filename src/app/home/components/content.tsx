'use client';
import { getInfoState } from '@/store/slices/paginationSlice';
import { useSelector } from 'react-redux';
import React from 'react';

export default function Content() {
    const info = useSelector(getInfoState);
    return (
        <div className="bg-aquamarine mx-88 my-24 p-24 border rounded-2 border-light-grey shadow-standard">
            <h5 className="heading-h5-bold color-dark mb-24">
                What have I done in the last 6 months?
            </h5>
            <ul className="flex flex-col gap-16">
                {info?.map((inf, index) => (
                    <React.Fragment key={inf}>
                        <li className="flex flex-row gap-6 items-center body-medium-regular text-black">
                            <div>{index + 1}.</div>
                            <div>{inf}</div>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}
