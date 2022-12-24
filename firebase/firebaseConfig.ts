// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-4_XvjqWSoWAfe2U-DqAG597LP8PfJ3g",
  authDomain: "cuota-admin.firebaseapp.com",
  projectId: "cuota-admin",
  storageBucket: "cuota-admin.appspot.com",
  messagingSenderId: "817497584188",
  appId: "1:817497584188:web:70112d8e70f9a6b71ac939",
  measurementId: "G-YD8583TYV6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
