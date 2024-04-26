'use client';
import React from 'react';
import { IListItem, IPage } from '@/shared/types/page.types';
import { useDispatch, useSelector } from '@/store/store';
import { ChangeEvent, useState } from 'react';
import Content from './content';
import { showEditPopup } from '@/store/actions/pageActions';
import { currentPageIdState } from '@/store/selectors/pageSelectors';
import { deletePage, addListItem, removeListItem } from '@/store/thunks/pageThunks';

export default function ContentClient({
    currentPage,
}: {
    currentPage: IPage | null | undefined;
}): React.JSX.Element {
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

    const removePage = (): void => {
        dispatch(deletePage(currentPageId ?? ''));
    };
    const editPage = (): void => {
        dispatch(showEditPopup());
    };
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
    const addItem = (): void => {
        dispatch(addListItem({ id: currentPageId ?? '', item: formData }));
    };
    const removeItem = (item: IListItem): void => {
        dispatch(removeListItem({ id: currentPageId ?? '', item }));
    };

    return (
        <Content page={currentPage} editPage={editPage} removePage={removePage}>
            <>
                <ul className="flex flex-col gap-6">
                    {currentPage?.list?.map((it, index) => (
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
                                disabled={currentPage?.list.length === 1}
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
            </>
        </Content>
    );
}
