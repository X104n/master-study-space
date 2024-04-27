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
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSorted, setIsSorted] = useState(false); // State to track if the list has been sorted

    const merge = (left, right, key) => {
        let arr = [];
        while (left.length && right.length) {
            const leftDate = left[0][key];
            const rightDate = right[0][key];
            const leftYear = parseInt(leftDate.substring(1), 10);
            const rightYear = parseInt(rightDate.substring(1), 10);
            const leftPrefix = leftDate[0]; // 'V' or 'H'
            const rightPrefix = rightDate[0]; // 'V' or 'H'

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
        setIsSorted(true); // Set isSorted to true after sorting
    };

    const selectRandomUser = () => {
        if (usersSorted.length > 0) {
            const earliestDate = usersSorted[0].examinationDate;
            const earliestGroup = usersSorted.filter(user => user.examinationDate === earliestDate);
            const randomUser = earliestGroup[Math.floor(Math.random() * earliestGroup.length)];
            setSelectedUser(randomUser);
        }
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
                        await populateUsers();
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
            {isSorted && (
                <button onClick={selectRandomUser}>Select Random User from Earliest Group</button>
            )}
            <div>
                {selectedUser ? (
                    <div>
                        <strong>Selected User:</strong> {selectedUser.name} - {selectedUser.examinationDate}
                    </div>
                ) : null}
                {usersSorted.length === 0 ? (
                    users.map(user => (
                        <div key={user.id}>
                            {user.examinationDate} - {user.name}
                        </div>
                    ))
                ) : (
                    usersSorted.map(user => (
                        <div key={user.id}>
                            {user.examinationDate} - {user.name}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
