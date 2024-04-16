// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6cCWkzmGWrcBMGovMlGUG6FYLVDOseEw",
  authDomain: "masterstudyhall.firebaseapp.com",
  databaseURL: "https://masterstudyhall-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "masterstudyhall",
  storageBucket: "masterstudyhall.appspot.com",
  messagingSenderId: "675554021466",
  appId: "1:675554021466:web:5a5668c916fb7c33a68863",
  measurementId: "G-HSEC5Q9E3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export {db} 