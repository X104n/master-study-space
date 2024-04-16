
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database'
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

const database = getDatabase.app();
export {database}
