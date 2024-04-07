'use client';
import React from 'react';

export default function Buttons() {
    return (
        <div className="h-68 px-88 flex items-center justify-between border-t border-light-grey fixed bottom-0 left-0 w-full">
            <button className="secondary-button">Previous</button>
            <button className="primary-button">Next</button>
        </div>
    );
}
