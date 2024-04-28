'use client'
import { useState, useEffect } from 'react';
import { get, ref } from "firebase/database";
import { db } from "@/app/config/firebaseConfig";

export default function Overview() {
    const [forms, setForms] = useState([]);

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
            <li>
                Jafu
                {forms.filter(form => form.studyRoom === 'Jafu').map((form, index) => (
                    <p key={index}>Name: {form.name} - Examination Date: {form.examinationDate}</p>
                ))}
            </li>
            <li>
                Sikkerhet
                {forms.filter(form => form.studyRoom === 'Sikkerhet').map((form, index) => (
                    <p key={index}>Name: {form.name} - Examination Date: {form.examinationDate}</p>
                ))}
            </li>
            <li>
                Optimering
                {forms.filter(form => form.studyRoom === 'Optimering').map((form, index) => (
                    <p key={index}>Name: {form.name} - Examination Date: {form.examinationDate}</p>
                ))}
            </li>
            <li>
                Selmer
                {forms.filter(form => form.studyRoom === 'Selmer').map((form, index) => (
                    <p key={index}>Name: {form.name} - Examination Date: {form.examinationDate}</p>
                ))}
            </li>
            <li>
                Glassburet
                {forms.filter(form => form.studyRoom === 'Glassburet').map((form, index) => (
                    <p key={index}>Name: {form.name} - Examination Date: {form.examinationDate}</p>
                ))}
            </li>
            <li>
                Maskinlæring
                {forms.filter(form => form.studyRoom === 'Maskinlæring').map((form, index) => (
                    <p key={index}>Name: {form.name} - Examination Date: {form.examinationDate}</p>
                ))}
            </li>
        </ul>
    </>
)
}