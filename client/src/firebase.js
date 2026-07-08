// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwwebai.firebaseapp.com",
  projectId: "genwwebai",
  storageBucket: "genwwebai.firebasestorage.app",
  messagingSenderId: "8565504877",
  appId: "1:8565504877:web:198382dcf18ab691c2b864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider= new GoogleAuthProvider()
export {auth,provider}