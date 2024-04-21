'use client';
import { IPage } from '@/shared/types/page.types';
import { currentPageState } from '@/store/slices/pageSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Content({ currentPage }: { currentPage: IPage }) {
    const storePage = useSelector(currentPageState);
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        if (storePage) {
            setPage(storePage);
        }
    }, [storePage]);
    return (
        <div className="pb-68">
            <div className="flex flex-col gap-18 desktop:mb-24 bg-aquamarine border rounded-2 border-light-grey shadow-standard m-16 p-12 desktop:mx-88 desktop:my-24 desktop:p-24">
                <h5 className="text-dark heading-h6-bold desktop:text-23 desktop:leading-31">
                    {page?.heading}
                </h5>
                <div className="text-black body-medium-regular">{page?.topText}</div>;
                <div>
                    <ul className="flex flex-col gap-6">
                        {page?.list?.map((it, index) => (
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
                <div className="text-black body-medium-regular">{page?.bottomText}</div>
            </div>
        </div>
    );
}
