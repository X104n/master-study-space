'use client';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import './temp.css'; // Ensure this is the correct path to your CSS file
import { filterAndSortUsers } from '../components/sort'; // Adjust the path as necessary

export default function Overview() {
    const [forms, setForms] = useState([]);
    const studyRooms = ["Selmer", "Glassburet", "Algoritme", "Jafu", "Optimering", "Maskinlæring"];
    const studyRoomsInfo = ["Selmer (2. etasje)", "Glassburet (3. etasje)", "Algoritme (3. etasje)", "Jafu (4. etasje)", "Optimering (4. etasje)", "Maskinlæring (6. etasje)"];

    const roomInfoMap = studyRooms.reduce((map, room, index) => {
        map[room] = studyRoomsInfo[index];
        return map;
    }, {});

    useEffect(() => {
        const db = getDatabase();
        const formsRef = ref(db, 'forms');

        const unsubscribe = onValue(formsRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedForms = Object.entries(snapshot.val()).map(([key, value]) => ({
                    ...value,
                    id: key
                }));
                setForms(fetchedForms);
            } else {
                console.log('No data available');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="overview-container">
            {studyRooms.map(room => (
                <div key={room} className="study-room">
                    <h2 className="study-room-title">{roomInfoMap[room]}</h2>
                    <div className="study-room-divider"></div>
                    <div className="forms-container">
                        {filterAndSortUsers(forms.filter(form => form.studyRoom === room), 'examinationDate')
                            .map((form, index) => (
                                <div key={index} className="form-item">
                                    <div className="form-label">Name:</div>
                                    <div className="form-data">{form.name}</div>
                                    <div className="form-label">Examination Date:</div>
                                    <div className="form-data">{form.examinationDate}</div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
