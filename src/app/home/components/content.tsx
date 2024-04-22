'use client';
import { IListItem, IPage } from '@/shared/types/page.types';
import {
    addListItem,
    currentPageIdState,
    deletePage,
    removeListItem,
    showEditPopup,
} from '@/store/slices/pageSlice';
import { useDispatch, useSelector } from '@/store/store';
import { ChangeEvent, useState } from 'react';

export default function Content({ page }: { page: IPage | null | undefined }): React.JSX.Element {
    const dispatch = useDispatch();
    const currentPageId = useSelector(currentPageIdState);
    const [error, setErrors] = useState<IListItem>({
        bold: '',
        regular: '',
    });
    const [formData, setFormData] = useState<IListItem>({
        bold: '',
        regular: '',
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (!value) {
            setErrors({
                ...error,
                [name]: 'Field is required',
            });
        } else {
            setErrors({
                ...error,
                [name]: null,
            });
        }
    };
    const removePage = (): void => {
        dispatch(deletePage(currentPageId ?? ''));
    };
    const editPage = (): void => {
        dispatch(showEditPopup());
    };
    const addItem = (): void => {
        dispatch(addListItem({ id: currentPageId ?? '', item: formData }));
    };
    const removeItem = (item: IListItem): void => {
        dispatch(removeListItem({ id: currentPageId ?? '', item }));
    };
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
                                className="flex flex-row body-medium-regular items-center text-black"
                                key={it.bold + it.regular}>
                                <div className="flex flex-row">
                                    <div className="body-medium-bold mr-6 mt-2">{index + 1}.</div>
                                    <div>
                                        <strong className="mr-6">{it.bold}</strong>
                                        {it.regular}
                                    </div>
                                </div>
                                <button
                                    disabled={page?.list.length === 1}
                                    onClick={() => removeItem(it)}
                                    className="forms-hint border rounded-2 ml-6 border-light-grey p-6 bg-lighter-grey">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-6 my-12">
                        <input
                            className={error.bold ? 'invalid' : ''}
                            placeholder="Bold text *"
                            type="text"
                            name="bold"
                            value={formData.bold}
                            onChange={handleChange}
                        />
                        <input
                            className={error.regular ? 'invalid' : ''}
                            placeholder="Regular text *"
                            type="text"
                            name="regular"
                            value={formData.regular}
                            onChange={handleChange}
                        />
                        <button
                            disabled={!formData.bold || !formData.regular}
                            type="button"
                            className="button-large border rounded-2 border-light-grey w-full py-6 bg-lighter-grey"
                            onClick={addItem}>
                            Add Item
                        </button>
                    </div>
                </div>
                <div className="text-black body-medium-regular">{page?.bottomText}</div>
            </div>
        </div>
    );
}
