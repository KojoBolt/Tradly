// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHIWHsk4sX54Peqq2bACnQn24wp-7GVdY",
  authDomain: "segun-8c856.firebaseapp.com",
  projectId: "segun-8c856",
  storageBucket: "segun-8c856.firebasestorage.app",
  messagingSenderId: "1012807915232",
  appId: "1:1012807915232:web:c01eaa06ceca9e1852a285"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

