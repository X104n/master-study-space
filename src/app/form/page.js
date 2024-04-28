"use client"
import { push, ref, set, get } from 'firebase/database';
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
  const [showNewFormPage, setShowNewFormPage] = useState(true)
  const [forms, setForms] = useState([]);
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

  const getForms = async (currentUser) => {
    const formsRef = ref(db, 'forms'); // Reference to the forms node in Firebase
    const snapshot = await get(formsRef); // Fetch all the forms

    if (snapshot.exists()) {
      const allForms = snapshot.val();
      // Filter forms for the current user
      const userForms = Object.entries(allForms).reduce((acc, [key, form]) => {
        if (form.userId === currentUser.uid) {
          // Add form key for identification if needed
          acc.push({ ...form, id: key });
        }
        return acc;
      }, []);
      setForms(userForms); // Set the filtered forms to the state
      setShowNewFormPage(userForms.length === 0); // Show form if no applications exist
    } else {
      console.log('No data available');
      setShowNewFormPage(true); // Show form if no applications exist
    }
  };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser); // Set the current user
          await getForms(currentUser);

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
        <h1>Søknader</h1>
        {!showNewFormPage ? (
          <div className={"study-room-form-container"}>
            <div className={"form"}>
            {forms.map((form, index) => (
                <div key={index}>
                  <div>Name: {form.name}</div>
                  <div>Student Number: {form.studentNumber}</div>
                  <div>Study Room: {form.studyRoom}</div>
                  <div>Examination Date: {form.examinationDate}</div>
                  {/* Render other details as needed */}
                </div>
            ))}
              <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                <button onClick={() => setShowNewFormPage(true)}>Send in a new application</button>
              </div>
            </div>
          </div>

        ) : (

          <div className="study-room-form-container">
            {submitError && <p className="error">{submitError}</p>}
            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <label htmlFor="name">Navn:</label>
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
              <div className="input-group">
                <label htmlFor="studentNumber">Student Nr.:</label>
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
              <div className="input-group">
                <label htmlFor="studyRoom">Ønsket master lesesal:</label>
                <select
                    id="studyRoom"
                    name="studyRoom"
                    value={formData.studyRoom}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                >
                  <option value="Selmer">Selmer (2. etasje)</option>
                  <option value="Glassburet">Glassburet (3. etasje)</option>
                  <option value="Algoritme">Algoritme (3. etasje)</option>
                  <option value="Jafu">Jafu (4. etasje)</option>
                  <option value="Optimering">Optimering (4. etasje)</option>
                  <option value="Maskinlæring">Maskinlæring (6. etasje)</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="examinationDate">Eksamineringsdato:</label>
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

              <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                <button type="submit" className="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sender inn...' : 'Send inn'}
                </button>
              </div>
              {}
              <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                <button onClick={() => setShowNewFormPage(false)}>Vis Søknader</button>
              </div>
            </form>
          </div>
          )}
      </>
  );


};