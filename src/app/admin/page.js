'use client'
import {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth, dbs, db} from '../config/firebaseConfig';
import {useRouter} from 'next/navigation';
import {ref, get, remove} from "firebase/database";
import {getDoc, doc, deleteDoc} from "firebase/firestore";
import {filterAndSortUsers} from '../components/sort';
import "./temp.css"


export default function Admin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [usersSorted, setUsersSorted] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [selectedStudyRoom, setSelectedStudyRoom] = useState("");

    const sortUsers = (studyRoom) => {
        // Use the provided studyRoom or default to selectedStudyRoom from state
        const room = studyRoom || selectedStudyRoom;

        setSelectedUser(null);  // Resetting the selected user
        const sorted = filterAndSortUsers([...users], 'examinationDate', room);
        setUsersSorted(sorted);
        setIsSorted(sorted.length > 0);
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
            <div className={"list-container"}>
                <div className="form">
                    <select
                        value={selectedStudyRoom}
                        onChange={e => {
                            setSelectedStudyRoom(e.target.value);
                            sortUsers(e.target.value);  // Call sortUsers function after setting the new room
                        }}
                        className={"input-group"}
                    >
                        <option value="" disabled>Velg et rom</option>
                        <option value="Selmer">Selmer (2. etasje)</option>
                        <option value="Glassburet">Glassburet (3. etasje)</option>
                        <option value="Algoritme">Algoritme (3. etasje)</option>
                        <option value="Jafu">Jafu (4. etasje)</option>
                        <option value="Optimering">Optimering (4. etasje)</option>
                        <option value="Maskinlæring">Maskinlæring (6. etasje)</option>
                    </select>
                    {/*<div style={{display: "flex", justifyContent: "center"}}>*/}
                        {/*<button className={"cool-button"} onClick={sortUsers}>Sort by examination date</button>*/}
                        {isSorted && (
                            <button className={"cool-button"} onClick={selectRandomUser}>Velg en tilfeldig bruker fra den tidligste gruppen</button>
                        )}
                    {/*</div>*/}
                    <div>
                        {selectedUser && (
                            <>
                            <h3>Valgt Søknad:</h3>
                            <div className="application-item">
                                <div className="application-details-grid">
                                    <div className="detail-label">Navn:</div>
                                    <div className="detail-info">{selectedUser.name}</div>

                                    <div className="detail-label">Eksamineringsdato:</div>
                                    <div className="detail-info">{selectedUser.examinationDate}</div>

                                    <button className="delete-button"
                                            onClick={() => deleteUser(selectedUser.id)}>Slett
                                    </button>
                                </div>
                            </div>
                            </>
                        )}
                        {isSorted && usersSorted.length > 0 && (
                            <>
                                <h3>Søknader:</h3>
                                {usersSorted.map((user, index) => (
                                    <div key={user.id || index} className="application-item">
                                        <div className="application-details-grid">
                                            <div className="detail-label">Navn:</div>
                                            <div className="detail-info">{user.name}</div>

                                            <div className="detail-label">Eksamineringsdato:</div>
                                            <div className="detail-info">{user.examinationDate}</div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>


    );
}
