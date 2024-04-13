'use client';
import { IInfo, TextType, getCurrentInfoState } from '@/store/slices/paginationSlice';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Content() {
    const info = useSelector(getCurrentInfoState);
    const renderText = (info: IInfo) => {
        switch (info.type) {
            case TextType.Heading:
                return (
                    <h5 className="text-dark heading-h6-bold desktop:text-23 desktop:leading-31">
                        {info.text}
                    </h5>
                );
            case TextType.TopText:
                return <div className="text-black body-medium-regular">{info.text}</div>;
            case TextType.List:
                return (
                    <div>
                        <ul className="flex flex-col gap-6">
                            {info.list?.map((it, index) => (
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
                );
            case TextType.BottomText:
                return <div className="text-black body-medium-regular">{info.text}</div>;
            default:
                return '';
        }
    };
    return (
        <div className="pb-68">
            <div className="flex flex-col gap-18 desktop:mb-24 bg-aquamarine border rounded-2 border-light-grey shadow-standard m-16 p-12 desktop:mx-88 desktop:my-24 desktop:p-24">
                {info?.map((inf) => (
                    <React.Fragment key={inf.type}>{renderText(inf)}</React.Fragment>
                ))}
            </div>
        </div>
    );
}
