"use client"
import { push, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import "./temp.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebaseConfig';


export default function StudyRoomForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // State to keep track of form inputs
  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
    studyRoom: '',
    examinationDate: ''
  });
  

    // State for registration
    const [registrationData, setRegistrationData] = useState({
      email: '',
      password: ''
    });


  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    // Function to handle input changes for the registration form
    const handleRegistrationChange = (e) => {
      const { name, value } = e.target;
      setRegistrationData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

  // Function to handle form data submission
  const handleAddData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to submit the form.');
      return;
    }
  
    try {
      const formsRef = ref(db, 'forms');
      const newFormRef = push(formsRef);
      await set(newFormRef, {
        ...formData,
        userId: user.uid  // Link the form to the user's UID
      });
      console.log("Data added successfully!");
      alert('Data added successfully!');
      setFormData({ name: '', studentNumber: '', studyRoom: '', examinationDate: '' }); // Reset form
    } catch (error) {
      console.error('Firebase Error:', error);
      alert('Error adding data: ' + error.message);
      setSubmitError('Failed to add data. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData); // Debugging log
    setIsSubmitting(true); // Indicate submission status
    setSubmitError(''); // Reset any previous submission error
  
    try {
      // Assuming handleAddData is an async function that returns a promise
      await handleAddData(formData);
      console.log("Data successfully added");

    } catch (error) {
      console.error("Error adding data: ", error);
      setSubmitError('Error adding data. Please try again.'); // Provide feedback to the user
    } finally {
      setIsSubmitting(false); // Reset submission status regardless of outcome
    }
  }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // User is signed in
          setUser(currentUser);
          setLoading(false);
        } else {
          // No user is signed in
          router.push('/login');
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
    <h1>Skjema for søknad</h1>
      <div className="study-room-form-container">
        {submitError && <p className="error">{submitError}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Ola Norman"
            />
          </div>
          <div>
            <label htmlFor="studentNumber">Student Number:</label>
            <input
                type="text"
                id="studentNumber"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="abc123"
            />
          </div>
          <div>
            <label htmlFor="studyRoom">What master reading room do you wish to study in:</label>
            <select
                id="studyRoom"
                name="studyRoom"
                value={formData.studyRoom}
                onChange={handleChange}
                required
                disabled={isSubmitting}
            >
              <option value="">Select a room</option>
              <option value="Algoritme">Algoritme</option>
              <option value="Jafu">Jafu</option>
              <option value="Optimering">Optimering</option>
            </select>
          </div>
          <div>
            <label htmlFor="examinationDate">Examination Date:</label>
            <input
                type="text"
                id="examinationDate"
                name="examinationDate"
                value={formData.examinationDate}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="V2025"
            />
          </div>
          <button type="submit" className="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );

};