'use client';

import { ChangeEvent, useState } from 'react';

export default function PagePopup() {
    const [formData, setFormData] = useState({
        name: '',
        heading: '',
        topText: '',
        bottomText: '',
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-40 flex flex-row items-center justify-center">
            <form className="p-16 flex flex-col gap-16 rounded-4 bg-white desktop:p-24 desktop:gap-16">
                <div className="flex flex-col">
                    <label className="label">Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="flex flex-col">
                    <label className="label">Heading *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.heading}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label">Top Text *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.topText}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label">Bottom Text *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.bottomText}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    );
}
