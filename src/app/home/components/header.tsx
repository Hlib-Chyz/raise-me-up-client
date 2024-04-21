import { getNumberOfCommits } from '@/store/slices/dataSlice';
import { showPopup } from '@/store/slices/pageSlice';
import { useDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Header(): React.JSX.Element {
    const [commits, setCommits] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.on('commitsUpdate', (data) => {
            setCommits(data.count);
        });
        dispatch(getNumberOfCommits());
        return (): void => {
            socket.disconnect();
        };
    }, [dispatch]);

    const addPage = (): void => {
        dispatch(showPopup());
    };
    return (
        <div className="h-72 flex flex-row items-center justify-between border-b border-light-grey bg-white px-16 desktop:px-88">
            <button onClick={addPage} className="add-button">
                Add Page
            </button>
            <div className="button-large text-purple">Total commits: {commits}</div>
        </div>
    );
}
