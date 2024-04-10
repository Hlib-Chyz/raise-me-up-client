import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Header() {
    const [commits, setCommits] = useState(0);

    useEffect(() => {
        const socket = io('https://0331-213-231-38-52.ngrok-free.app');
        socket.on('commitsUpdate', (data) => {
            console.log(123);
            setCommits(data.count);
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    return <div>Total commits: {commits}</div>;
}
