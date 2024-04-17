'use client';

import { getCurrentPageState } from '@/store/slices/paginationSlice';
import { useSelector } from 'react-redux';

export default function Content() {
    const pageInfo = useSelector(getCurrentPageState);
    return (
        <div className="pb-68">
            <div className="flex flex-col gap-18 desktop:mb-24 bg-aquamarine border rounded-2 border-light-grey shadow-standard m-16 p-12 desktop:mx-88 desktop:my-24 desktop:p-24">
                <h5 className="text-dark heading-h6-bold desktop:text-23 desktop:leading-31">
                    {pageInfo?.heading}
                </h5>
                <div className="text-black body-medium-regular">{pageInfo?.topText}</div>;
                <div>
                    <ul className="flex flex-col gap-6">
                        {pageInfo?.list?.map((it, index) => (
                            <li
                                className="flex flex-row body-medium-regular text-black"
                                key={it.bold + it.regular}>
                                <div className="body-medium-bold mr-6 mt-2">{index + 1}.</div>
                                <div>
                                    <strong className="mr-6">{it.bold}</strong>
                                    {it.regular}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-black body-medium-regular">{pageInfo?.bottomText}</div>
            </div>
        </div>
    );
}
