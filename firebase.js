// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKmNZSw7cvvpnFp0kYsrPdu12SYf027Oo",
  authDomain: "electricity-72634.firebaseapp.com",
  projectId: "electricity-72634",
  storageBucket: "electricity-72634.appspot.com",
  messagingSenderId: "27681359275",
  appId: "1:27681359275:web:c5fd3a9db63cac819a7eee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, app };
