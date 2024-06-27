// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-sOJ_JF5r3zNtazR-8M0YW6Ahdn9dqqE",
    authDomain: "vsesdal-bc6ac.firebaseapp.com",
    projectId: "vsesdal-bc6ac",
    storageBucket: "vsesdal-bc6ac.appspot.com",
    messagingSenderId: "1035733656841",
    appId: "1:1035733656841:web:a8a13e7c7150a821c5dfd8",
    measurementId: "G-3FHNZEV6ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);