'use client'
import {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, dbs, db} from '../config/firebaseConfig';
import {useRouter} from 'next/navigation';
import {ref, get, remove} from "firebase/database";
import {getDoc, doc, deleteDoc} from "firebase/firestore";
import {filterAndSortUsers} from '../components/sort';

export default function Admin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [usersSorted, setUsersSorted] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [selectedStudyRoom, setSelectedStudyRoom] = useState("Jafu");

    const sortUsers = () => {
        const sorted = filterAndSortUsers([...users], 'examinationDate', selectedStudyRoom);
        setUsersSorted(sorted);
        setIsSorted(true);
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
        const formsRef = ref(db, 'forms');  // Assuming this is a reference to a Firestore collection
        try {
            const snapshot = await get(formsRef);
            if (snapshot.exists()) {
                const fetchedUsers = Object.entries(snapshot.val()).map(([key, value]) => ({
                    ...value, // Spread all existing user data
                    id: key     // Add the Firebase Realtime Database key as the unique ID
                }));
                setUsers(fetchedUsers);
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (userId) => {
        if (!userId) return;

        try {
            const userRef = ref(db, `forms/${userId}`);
            await remove(userRef);
            console.log("Document successfully deleted!");
            setSelectedUser(null);
            await populateUsers();
        } catch (error) {
            console.error("Error removing document:", error);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const docRef = doc(dbs, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.isAdmin) {
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
            <select
                value={selectedStudyRoom}
                onChange={e => setSelectedStudyRoom(e.target.value)}
                style={{marginBottom: '10px'}}
            >
                <option value="Jafu">Jafu</option>
                <option value="Sikkerhet">Sikkerhet</option>
                <option value="Optimering">Optimering</option>
                <option value="Selmer">Selmer</option>
                <option value="Glassburet">Glassburet</option>
                <option value="Maskinlæring">Maskinlæring</option>
            </select>
            <button onClick={sortUsers}>Sort Users in Selected Study Room</button>
            {isSorted && (
                <button onClick={selectRandomUser}>Select Random User from Earliest Group</button>
            )}
            <div>
                {selectedUser ? (
                    <div>
                        <strong>Selected User:</strong> {selectedUser.name} - {selectedUser.examinationDate}
                        <button onClick={() => deleteUser(selectedUser.id)}>Delete</button>
                    </div>
                ) : null}
                {usersSorted.length === 0 ? (
                    users.map((user, index) => (
                        <div key={user.id || index}>
                            {user.examinationDate} - {user.name}
                        </div>
                    ))
                ) : (
                    usersSorted.map((user, index) => (
                        <div key={user.id || index}>
                            {user.examinationDate} - {user.name}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
