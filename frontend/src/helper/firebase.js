// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { VITE_FIREBASE_API } from "./APIs.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API(),
  authDomain: "blog-webapp-35832.firebaseapp.com",
  projectId: "blog-webapp-35832",
  storageBucket: "blog-webapp-35832.firebasestorage.app",
  messagingSenderId: "284284127261",
  appId: "1:284284127261:web:25bf6ad5dda050ee059ef4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }