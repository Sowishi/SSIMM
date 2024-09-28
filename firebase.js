// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqyrC8_Y1YmS1dgr0VYR8fzHW2trwtE4w",
  authDomain: "jpang-d88e8.firebaseapp.com",
  databaseURL: "https://jpang-d88e8-default-rtdb.firebaseio.com",
  projectId: "jpang-d88e8",
  storageBucket: "jpang-d88e8.appspot.com",
  messagingSenderId: "957593855289",
  appId: "1:957593855289:web:577bd3de3af70a9d06f4e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, app };
