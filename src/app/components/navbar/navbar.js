'use client'
import "./temp.css"
import { useRouter } from 'next/navigation';
import Image from "next/image"

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="navbar flex items-center">
            <div className="navbar-content flex items-center">
                <div className={"flex items-center "}>
                    <div className={"logo-container"}>
                        <a href="https://echo.uib.no/" target="_blank" rel="noopener noreferrer">
                            {/*<img alt="Logo" src= className={"logo"}></img>*/}
                            <Image
                                src = "/echo-logo.webp"    // public is next to src
                                alt = "Echo Hovedside"
                                width={64}
                                height={64}
                                className={"logo"}
                            />
                        </a>
                    </div>
                    <ul>
                        <li><button onClick={() => router.push('/')}>Hjem</button></li>
                        <li><button onClick={() => router.push('/map')}>Kart</button></li>
                        <li><button onClick={() => router.push('/form')}>Søknad</button></li>
                    </ul>
                </div>

                <div className={"profile"}>
                    <button>Profile</button>
                </div>
            </div>
        </div>
    );
}
