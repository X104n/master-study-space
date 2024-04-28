'use client'
import "./temp.css"
import { useRouter } from 'next/navigation';
import Image from "next/image"
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, dbs} from "@/app/config/firebaseConfig";
import { signOut } from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";

export default function Navbar() {
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState(false)
    const [showAdmin, setShowAdmin] = useState(false)

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // User is signed in
                setUser(currentUser);

                const docRef = doc(dbs, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.isAdmin) {
                        setShowAdmin(true);
                    }
                }
                setLoading(false);
            } else {
                // No user is signed in
                setUser(null);
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array means this effect only runs once on mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if(user === null) {
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
                            <li>
                                <button onClick={() => router.push('/')}>Hjem</button>
                            </li>
                            <li>
                                <button onClick={() => router.push('/map')}>Kart</button>
                            </li>
                            <li>
                                <button onClick={() => router.push('/form')}>Søknad</button>
                            </li>
                            <li>
                                <button onClick={() => router.push('/overview')}>Alle søknader</button>
                            </li>
                        </ul>
                    </div>
                    <div className={"items-center profile"}>
                        <button onClick={() => router.push('/login')}>Logg inn</button>
                    </div>
                </div>
            </div>
        );
    }

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
                        <li>
                            <button onClick={() => router.push('/')}>Hjem</button>
                        </li>
                        <li>
                            <button onClick={() => router.push('/map')}>Kart</button>
                        </li>
                        <li>
                            <button onClick={() => router.push('/form')}>Søknad</button>
                        </li>
                        <li>
                            <button onClick={() => router.push('/overview')}>Alle søknader</button>
                        </li>
                    </ul>
                </div>

                <div className={"items-center profile"}>
                    {/*TODO: Add light/dark mode button*/}
                    <button onClick={toggleDropdown}>
                        <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" className="profile-icon"
                             height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z"
                                  fill="currentColor"></path>
                        </svg>
                    </button>
                    {showDropdown && (
                        <div className={"dropdown-menu"}>
                            <div><button className={"dropdown-menu-button"} onClick={() => router.push('/bruker')}>Min profil</button></div>
                            {showAdmin ? (
                                <div><button className={"dropdown-menu-button"} onClick={() => router.push('/admin')}>Admin</button></div>
                            ) : null}

                            <button
                                className={"dropdown-menu-button"}
                                onClick={async () => {
                                    try {
                                        await signOut(auth);
                                        router.push('/'); // Redirect to home page after sign out
                                    } catch (error) {
                                        console.error(`Error signing out: ${error}`);
                                    }
                                }}
                            >
                                Logg ut
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
