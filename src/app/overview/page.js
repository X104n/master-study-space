'use client'
import { useState, useEffect } from 'react';
import { get, ref } from "firebase/database";
import { db } from "@/app/config/firebaseConfig";
import { filterAndSortUsers } from '../components/sort';

export default function Overview() {
    const [forms, setForms] = useState([]);
    const studyRooms = ['Jafu', 'Sikkerhet', 'Optimering', 'Selmer', 'Glassburet', 'Maskinlæring'];

    const populateForms = async () => {
        const formsRef = ref(db, 'forms');
        try {
            const snapshot = await get(formsRef);
            if (snapshot.exists()) {
                const fetchedForms = Object.entries(snapshot.val()).map(([key, value]) => ({
                    ...value,
                    id: key
                }));
                setForms(fetchedForms);
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error("Error fetching forms:", error);
        }
    };

    useEffect(() => {
        populateForms();
    }, []);

    return (
        <>
            <ul>
                {studyRooms.map(room => (
                    <li key={room}>
                        {room}
                        {filterAndSortUsers(forms.filter(form => form.studyRoom === room), 'examinationDate', room).map((form, index) => (
                            <p key={index}>Name: {form.name} - Examination Date: {form.examinationDate}</p>
                        ))}
                    </li>
                ))}
            </ul>
        </>
    )
}