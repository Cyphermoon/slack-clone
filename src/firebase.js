// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsUAgk9hx8J105UZJJMtmB-GTH6R6rXNQ",
    authDomain: "slack-clone-a0743.firebaseapp.com",
    projectId: "slack-clone-a0743",
    storageBucket: "slack-clone-a0743.appspot.com",
    messagingSenderId: "980995119170",
    appId: "1:980995119170:web:3496c46510ba968f8d75db",
    measurementId: "G-G8GB1LK1CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);