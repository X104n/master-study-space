'use client'
import {push, ref, set, get, remove} from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import "./temp.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebaseConfig';
import {findUserGroup} from "@/app/components/pool";


export default function StudyRoomForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showNewFormPage, setShowNewFormPage] = useState(true)
  const [forms, setForms] = useState([]);
  const [group, setGroup] = useState("");
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
      console.log("Søknad sent!");
      alert('Søknad sent!');
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

  const deleteApplication = async (applicationId) => {
    // Here you would call Firebase to delete the application
    // For example:
    const applicationRef = ref(db, 'forms/' + applicationId);
    await remove(applicationRef);
    // Update the local state to remove the application from the list
    setForms(forms.filter((form) => form.id !== applicationId));
  };

  const getGroup = (form) => {
    const g =  findUserGroup(forms, form.userId, form.studyRoom);
    setGroup(g)
  }
  
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
        {!showNewFormPage ? (
        <>
          <h1>Dine Søknader</h1>
          <div className={"study-room-form-container"}>
            <div className="form">
              {forms.map((form, index) => (
                  <div key={index} className="application-item">
                    <div className="application-details-grid">
                      <div className="detail-label">ID:</div>
                      <div className="detail-info">{form.id}</div>

                      <div className="detail-label">Navn:</div>
                      <div className="detail-info">{form.name}</div>

                      <div className="detail-label">Student Nr.:</div>
                      <div className="detail-info">{form.studentNumber}</div>

                      <div className="detail-label">Lesesal:</div>
                      <div className="detail-info">{form.studyRoom}</div>

                      <div className="detail-label">Eksamineringsdato:</div>
                      <div className="detail-info">{form.examinationDate}</div>

                      <div className="detail-label">Group:</div>
                      <div className="detail-info">{group}</div>
                      <button onClick={() => getGroup(form)}>Get group</button>

                    </div>
                    <button
                        onClick={() => deleteApplication(form.id)}
                        className="delete-button"
                    >
                      Slett
                    </button>
                  </div>
              ))}
            </div>
            <div style={{display: "flex", justifyContent: "center", width: "60%"}}>
              <button className={"submit-button"} onClick={() => setShowNewFormPage(true)}
              >Send inn ny søknad</button>
            </div>
          </div>
        </>

        ) : (
            <>
              <h1>Send inn ny søknad</h1>
              <div className="study-room-form-container">
                {submitError && <p className="error">{submitError}</p>}
                <form onSubmit={handleSubmit} style={{paddingTop: "13px"}} className="form">
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
                  <option value="" disabled>Velg et rom</option>
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
                <button type="submit" className="submit submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sender inn...' : 'Send inn'}
                </button>
              </div>
              {}

            </form>

            <div style={{display: "flex", justifyContent: "center", width: "60%"}}>
              <button  className={"submit-button"} onClick={() => {
                setShowNewFormPage(false);
                getForms(user);
              }}>Dine Søknader
              </button>
            </div>
              </div>
            </>
        )}
      </>
  );


};