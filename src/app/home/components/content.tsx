'use client';
import { getCurrentInfoState } from '@/store/slices/paginationSlice';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Content() {
    const info = useSelector(getCurrentInfoState);
    return (
        <div className="pb-68">
            <div className="bg-aquamarine border rounded-2 border-light-grey shadow-standard m-16 p-12 desktop:mx-88 desktop:my-24 desktop:p-24">
                <h5 className="color-dark heading-h6-bold mb-18 desktop:mb-24 desktop:text-23 desktop:leading-31">
                    What have I done in the last 6 months?
                </h5>
                <ul className="flex flex-col gap-12 desktop:gap-16">
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
        </div>
    );
}
