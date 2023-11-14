// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDyFw1lShEUBjquZ_h0pbKaNcb0bhBb1aA",
  authDomain: "skill-harbor-c74cb.firebaseapp.com",
  projectId: "skill-harbor-c74cb",
  storageBucket: "skill-harbor-c74cb.appspot.com",
  messagingSenderId: "792467488915",
  appId: "1:792467488915:web:f5f59d6ae1ae657e280d66",
  measurementId: "G-41NEXCRQHQ"
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);
export default {firebase, db};
