// src/config/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDursKM7so3VTYtwLSKDMeajM8unemlJzo",
  authDomain: "traydly.firebaseapp.com",
  projectId: "traydly",
  storageBucket: "traydly.firebasestorage.app",
  messagingSenderId: "670365240925",
  appId: "1:670365240925:web:ede4e255363b8d88fec7b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // Single declaration and export