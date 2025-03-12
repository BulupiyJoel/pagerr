import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMy1m1UlIwgfEqahyaMhv0Elq-xN9nJ0M",
  authDomain: "rqdrc-bde58.firebaseapp.com",
  projectId: "rqdrc-bde58",
  storageBucket: "rqdrc-bde58.firebasestorage.app",
  messagingSenderId: "137940773",
  appId: "1:137940773:web:243469ee565036140e54cc",
  measurementId: "G-6T7346P0T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db ,firebaseConfig }