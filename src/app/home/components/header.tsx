import { getNumberOfCommits } from '@/store/slices/dataSlice';
import { useDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Header() {
    const [commits, setCommits] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.on('commitsUpdate', (data) => {
            setCommits(data.count);
        });
        dispatch(getNumberOfCommits());
        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <div className="h-72 px-88 flex flex-row items-center justify-end border-b border-light-grey bg-white">
            <div className="button-large text-purple">Total commits: {commits}</div>
        </div>
    );
}
