'use client'
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useRouter } from 'next/navigation';

export default function DesksAdmin() {
    const [desks, setDesks] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const db = getDatabase();
        const desksRef = ref(db, 'desks');

        const unsubscribe = onValue(desksRef, (snapshot) => {
            if (snapshot.exists()) {
                setDesks(snapshot.val());
                setLoading(false);

            } else {
                console.log("No data available");
                setLoading(false);
            }
        }, {
            onlyOnce: false
        });

        return () => unsubscribe();
    }, []);

    const toggleDeskStatus = (locationId, deskId) => {
        const status = desks[locationId].desks[deskId].status === 'available' ? 'booked' : 'available';
        const db = getDatabase();
        set(ref(db, `desks/${locationId}/desks/${deskId}/status`), status);
    };

    if (loading) {
        return <div>Loading desks...</div>;
    }

    return (
        <div>
            <h1>Admin Desk Assignments</h1>
            {Object.entries(desks).map(([locationId, location]) => (
                <div key={locationId}>
                    <h2>{location.name}</h2>
                    <ul>
                        {Object.entries(location.desks).map(([deskId, desk]) => (
                            <li key={deskId}>
                                {desk.name} - Status: {desk.status}
                                <button onClick={() => toggleDeskStatus(locationId, deskId)}>
                                    Toggle Status
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
