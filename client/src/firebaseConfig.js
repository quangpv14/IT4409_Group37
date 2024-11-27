// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "group1-sapo.firebaseapp.com",
    projectId: "group1-sapo",
    storageBucket: "group1-sapo.appspot.com",
    messagingSenderId: "839212361736",
    appId: "1:839212361736:web:946995926607472da789bd",
    measurementId: "G-Z7DBBTGJGX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);