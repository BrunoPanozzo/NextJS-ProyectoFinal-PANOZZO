// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjZYppbPMqtqViH4v2QP-FJeB57XsompI",
  authDomain: "samsung-ecommerce-nextjs.firebaseapp.com",
  projectId: "samsung-ecommerce-nextjs",
  storageBucket: "samsung-ecommerce-nextjs.appspot.com",
  messagingSenderId: "302325348463",
  appId: "1:302325348463:web:0921f47cd3557fdb35359a",
  measurementId: "G-90RS6YT9VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);