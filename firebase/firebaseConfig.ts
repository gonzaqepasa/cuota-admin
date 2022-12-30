// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcM6pAek7NQB3ZqIUzVsTOTL5FnXfDeVc",
  authDomain: "cuota-admin-2e674.firebaseapp.com",
  projectId: "cuota-admin-2e674",
  storageBucket: "cuota-admin-2e674.appspot.com",
  messagingSenderId: "426391867478",
  appId: "1:426391867478:web:57f45f27aa86bf9c77abf7",
  measurementId: "G-7201CLL1Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
