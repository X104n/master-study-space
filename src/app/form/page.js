"use client"
import React, { useState } from 'react';
import "./temp.css"

export default function StudyRoomForm() {
  // State to keep track of form inputs
  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
    studyRoom: ''
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here or send to an API
    console.log(formData);
    alert('Form submitted. Check the console for the form data.');
  };

  return (
    <>
    <h1>Skjma for søknad</h1>
    <div className="study-room-form-container">
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
        />
      </div>
      <div>
        <label htmlFor="studyRoom">What master reading room do you wish to study:</label>
        <select
          id="studyRoom"
          name="studyRoom"
          value={formData.studyRoom}
          onChange={handleChange}
          required
        >
          <option value="">Select a room</option>
          <option value="Algoritme">Algoritme</option>
          <option value="Jafu">Jafu</option>
          <option value="Optimering">Optimering</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
    </>
  );
}
