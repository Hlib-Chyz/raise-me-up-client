import Link from 'next/link';

export default function Initial(): React.JSX.Element {
    return (
        <main>
            <Link className="w-full flex flex-row items-center justify-center mt-16" href="/home">
                <div className="primary-button flex flex-row items-center">Home</div>
            </Link>
        </main>
    );
}
