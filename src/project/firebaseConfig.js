// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, auth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtVHkjP3zF1L1tHAMSkzgd7U4z-uRQN7c",
  authDomain: "e-commerce-dfd0c.firebaseapp.com",
  projectId: "e-commerce-dfd0c",
  storageBucket: "e-commerce-dfd0c.firebasestorage.app",
  messagingSenderId: "926528028594",
  appId: "1:926528028594:web:0224ef85171597bfc1aeab",
  measurementId: "G-GRMNXR0QF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth(app)

export {auth, provider}