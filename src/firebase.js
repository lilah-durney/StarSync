// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "starsync-11b5d.firebaseapp.com",
  projectId: "starsync-11b5d",
  storageBucket: "starsync-11b5d.firebasestorage.app",
  messagingSenderId: "380758082873",
  appId: "1:380758082873:web:3ada03261b5e84d96fd4e8",
  measurementId: "G-1Q0WMMGRSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initilize Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export { doc, setDoc, getDoc };
export default app; 

