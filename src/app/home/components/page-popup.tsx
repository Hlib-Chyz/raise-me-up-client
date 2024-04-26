'use client';
import React from 'react';
import { IListItem } from '@/shared/types/page.types';
import { hidePopup } from '@/store/actions/pageActions';
import { currentPageState, isShowEditPopupState } from '@/store/selectors/pageSelectors';
import { useDispatch, useSelector } from '@/store/store';
import { updatePage, addPage } from '@/store/thunks/pageThunks';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function PagePopup(): React.JSX.Element {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        heading: '',
        topText: '',
        bottomText: '',
        bold: '',
        regular: '',
    });
    const currentPage = useSelector(currentPageState);
    const isShowEditPopup = useSelector(isShowEditPopupState);
    const [list, setList] = useState<IListItem[]>([]);
    useEffect(() => {
        if (isShowEditPopup && currentPage) {
            setFormData({
                ...currentPage,
                bold: '',
                regular: '',
            });
            setList(currentPage.list);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [error, setErrors] = useState({
        name: null as string | null,
        heading: null as string | null,
        topText: null as string | null,
        bottomText: null as string | null,
        bold: null as string | null,
        regular: null as string | null,
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
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { bold, regular, ...rest } = formData;
        if (isShowEditPopup) {
            dispatch(updatePage({ ...rest, list, _id: currentPage?._id ?? '' }));
        } else {
            dispatch(addPage({ ...rest, list }));
        }
    };
    const addItem = (): void => {
        setList([...list, { bold: formData.bold, regular: formData.regular }]);
        setFormData({
            ...formData,
            bold: '',
            regular: '',
        });
    };
    const removeItem = (index: number): void => {
        setList(list.filter((_it, i) => i !== index));
    };
    const disabledSaveButton = (): boolean => {
        return (
            !formData.name ||
            !formData.heading ||
            !formData.topText ||
            !formData.bottomText ||
            !list.length
        );
    };
    const cancel = (): void => {
        dispatch(hidePopup());
    };

    return (
        <div className="fixed left-0 p-16 top-0 w-full h-full bg-black bg-opacity-40 flex flex-row items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="p-16 flex flex-col gap-16 rounded-4 bg-white desktop:p-24 desktop:gap-16">
                <div className="flex flex-col">
                    <label htmlFor="name" className="label">
                        Name *
                    </label>
                    <input
                        id="name"
                        className={error.name ? 'invalid' : ''}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="heading" className="label">
                        Heading *
                    </label>
                    <input
                        id="heading"
                        className={error.heading ? 'invalid' : ''}
                        type="text"
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="top-text" className="label">
                        Top Text *
                    </label>
                    <input
                        id="top-text"
                        className={error.topText ? 'invalid' : ''}
                        type="text"
                        name="topText"
                        value={formData.topText}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="bottom-text" className="label">
                        Bottom Text *
                    </label>
                    <input
                        id="bottom-text"
                        className={error.bottomText ? 'invalid' : ''}
                        type="text"
                        name="bottomText"
                        value={formData.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <label className="label">List *</label>
                    <ul className="flex flex-col gap-6">
                        {list.map((item, index) => (
                            <li
                                className="flex flex-row items-center body-medium-regular text-black"
                                key={item.bold + item.regular}>
                                <div className="body-medium-bold mr-6 mt-2">{index + 1}.</div>
                                <div>
                                    <strong className="mr-6">{item.bold}</strong>
                                    {item.regular}
                                </div>
                                <button
                                    type="button"
                                    className="forms-hint border rounded-2 ml-6 border-light-grey p-6 bg-lighter-grey"
                                    onClick={() => removeItem(index)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
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
                <div className="flex flex-row gap-12 w-full">
                    <button onClick={cancel} type="button" className="secondary-button w-full">
                        Cancel
                    </button>
                    <button
                        disabled={disabledSaveButton()}
                        type="submit"
                        className="primary-button w-full">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
