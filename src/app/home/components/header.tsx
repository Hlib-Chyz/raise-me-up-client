import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Header() {
    const [commits, setCommits] = useState(0);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.on('commitsUpdate', (data) => {
            setCommits(data.count);
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    return <div>Total commits: {commits}</div>;
}
