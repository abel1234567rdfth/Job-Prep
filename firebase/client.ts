// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkfmyrnrOgnsNffFTyY5LC698zhGKCut4",
  authDomain: "job-prep-b6679.firebaseapp.com",
  projectId: "job-prep-b6679",
  storageBucket: "job-prep-b6679.firebasestorage.app",
  messagingSenderId: "1063861726088",
  appId: "1:1063861726088:web:594266bb6190f53e1e283d",
  measurementId: "G-L6R29FC4CF",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
