'use client'
import {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, dbs} from '../config/firebaseConfig';
import {useRouter} from 'next/navigation';
import {doc, getDoc} from "firebase/firestore";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const docRef = doc(dbs, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const isAdmin = userData.isAdmin;

                    if (isAdmin) {
                        setUser(currentUser);
                        setLoading(false);
                    } else {
                        router.push('/');
                    }
                } else {
                    router.push('/');
                }
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


    return (
        <>
            <h1>Admin</h1>
            <p>Name: {user?.displayName || 'UserID not available'}</p>

        </>
    );
}
