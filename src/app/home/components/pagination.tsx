'use client';
import React, { useState } from 'react';

export default function Pagination() {
    const points = ['English', 'NEXT', 'NEST', 'Mongodb', 'Tailwind', 'Redux', 'Tests'];
    const [current, setCurrent] = useState(0);
    return (
        <div className="h-64 px-88 flex items-center justify-between border-b border-light-grey">
            {points.map((point, index) => (
                <React.Fragment key={point}>
                    <button
                        onClick={() => setCurrent(index)}
                        className={`flex gap-12 body-medium-bold text-light-grey items-center ${current === index ? 'text-purple' : ''}`}>
                        <div
                            className={`h-28 w-28 flex items-center justify-center bg-light-grey text-white rounded-4 ${current === index ? 'text-white bg-purple' : ''}`}>
                            {index + 1}
                        </div>
                        <div>{point}</div>
                    </button>
                    <div
                        className={
                            index !== points.length - 1 ? 'w-42 h-1 bg-light-grey' : ''
                        }></div>
                </React.Fragment>
            ))}
        </div>
    );
}
