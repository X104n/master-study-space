'use client'
import {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, dbs, db} from '../config/firebaseConfig';
import {useRouter} from 'next/navigation';
import {ref, get} from "firebase/database";
import {getDoc, doc,} from "firebase/firestore";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [usersSorted, setUsersSorted] = useState([]);

    // Modified merge function that takes into account the examination date prefix and year
    const merge = (left, right, key) => {
        let arr = [];
        while (left.length && right.length) {
            // Parsing the examinationDate to compare 'V' and 'H' and the year
            const leftDate = left[0][key];
            const rightDate = right[0][key];
            const leftYear = parseInt(leftDate.substring(1), 10);
            const rightYear = parseInt(rightDate.substring(1), 10);
            const leftPrefix = leftDate[0]; // 'V' or 'H'
            const rightPrefix = rightDate[0]; // 'V' or 'H'

            // Compare first by year, then by 'V' or 'H'
            if (leftYear < rightYear || (leftYear === rightYear && leftPrefix < rightPrefix)) {
                arr.push(left.shift());
            } else {
                arr.push(right.shift());
            }
        }
        return [...arr, ...left, ...right];
    }

    const mergeSort = (arr, key) => {
        const half = arr.length / 2;
        if (arr.length < 2) {
            return arr;
        }
        const left = arr.splice(0, half);
        return merge(mergeSort(left, key), mergeSort(arr, key), key);
    }

    const sortUsers = () => {
        const sorted = mergeSort([...users], 'examinationDate');
        setUsersSorted(sorted);
    };

    const populateUsers = async () => {
        const formsRef = ref(db, 'forms');
        try {
            const snapshot = await get(formsRef);
            if (snapshot.exists()) {
                setUsers(Object.values(snapshot.val()));
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
                        populateUsers();
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

        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Admin</h1>
            <button onClick={sortUsers}>Sort Users</button>
            <div>
                {usersSorted.map(user => (
                    <div key={user.id}>
                        {user.name} - {user.examinationDate}
                    </div>
                ))}
            </div>
        </>
    );
}
