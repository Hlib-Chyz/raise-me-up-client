'use client';
import { IPage } from '@/shared/types/page.types';
import { MouseEventHandler } from 'react';

export default function Content({
    page,
    removePage,
    editPage,
}: {
    page: IPage | null | undefined;
    removePage?: MouseEventHandler<HTMLButtonElement>;
    editPage?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <div className="pb-68">
            <div className="flex flex-col gap-18 desktop:mb-24 bg-aquamarine border rounded-2 border-light-grey shadow-standard m-16 p-12 desktop:mx-88 desktop:my-24 desktop:p-24">
                <div className="flex flex-row justify-between">
                    <h5 className="text-dark heading-h6-bold desktop:text-23 desktop:leading-31">
                        {page?.heading}
                    </h5>
                    <div className="flex flex-row gap-12 items-center">
                        <button onClick={editPage} className="add-button">
                            Edit Page
                        </button>
                        <button className="remove-button" onClick={removePage}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className="text-black body-medium-regular">{page?.topText}</div>
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
