'use client'
import {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, dbs, db} from '../config/firebaseConfig';
import {useRouter} from 'next/navigation';
import {getDatabase, ref, child, get} from "firebase/database";
import {onValue, query, orderByKey} from "firebase/database";
import {
    getDocs,
    getDoc,
    collection,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    setDoc,
} from "firebase/firestore";


export default function Admin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [users, setUsers] = useState([]);

    const populateUsers = async () => {
        const formsRef = ref(db, 'forms');  // Adjust this path if your database structure is different
        try {
            const snapshot = await get(formsRef);
            if (snapshot.exists()) {
                setUsers(Object.values(snapshot.val()));  // Convert object of objects into an array
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error(error);
        }
    }

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
            } else {
                router.push('/');
            }
        });

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };


    }, []); // Empty dependency array means this effect only runs once on mount

    const click = () => {
        populateUsers();
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <h1>Admin</h1>
            <button onClick={click}>Click pop</button>
            <button onClick={() => console.log("Users: ", users)}>Click print</button>
            <pre>{JSON.stringify(users, null, 2)}</pre>
            {/* Optional: To display users data on the page */}
        </>
    );
}
