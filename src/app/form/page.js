"use client"
import { push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { db } from './firebaseConfig'; 
import "./temp.css"

export default function StudyRoomForm() {
  // State to keep track of form inputs
  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
    studyRoom: '',
    examinationDate: ''
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

  // Function to handle form data submission
  
  const handleAddData = async () => {
    try {
      console.log("Attempting to add data...", formData); // Debugging log
      const usersRef = ref(db, 'users');
      const newDataRef = push(usersRef);
      await set(newDataRef, formData);
      console.log("Data added successfully!"); // Success log
      alert('Data added successfully!');
      setFormData({ name: '', studentNumber: '', studyRoom: '' }); // Reset form
    } catch (error) {
      console.error('Firebase Error:', error); // Enhanced error logging
      alert('Error adding data: ' + error.message); // Detailed alert based on the error message
      setSubmitError('Failed to add data. Please try again later.'); // Set submit error state
    } finally {
      setIsSubmitting(false); // Reset submission status
    }
  };
  
  
  /*
  const handleAddData = async () => {
    try {
      const testRef = ref(db, 'test');
      await set(testRef, { hello: "world" });
      alert('Test data added successfully!');
    } catch (error) {
      console.error('Firebase Test Error:', error);
      alert('Test error: ' + error.message);
    }
  };
*/
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
      // Here, you could also reset the form or provide a success message to the user
    } catch (error) {
      console.error("Error adding data: ", error);
      setSubmitError('Error adding data. Please try again.'); // Provide feedback to the user
    } finally {
      setIsSubmitting(false); // Reset submission status regardless of outcome
    }
  };
  
  

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
}
