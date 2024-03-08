'use client'
import "./temp.css"
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="navbar">
            <ul>
                <li>
                    <button onClick={() => router.push('/')}>Home</button>
                </li>
                <li>
                    <button onClick={() => router.push('/map')}>Map</button>
                </li>
                <li>
                    <button onClick={() => router.push('/form')}>Form</button>
                </li>
            </ul>

            <ul>
                <li>
                    <button>Profile</button>
                </li>
            </ul>
        </div>
    );
}
