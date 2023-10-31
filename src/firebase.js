// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDglTVewUX4QoIlTZ8wxl5jl9SR7Bhv5S8",
  authDomain: "bargain-web.firebaseapp.com",
  projectId: "bargain-web",
  storageBucket: "bargain-web.appspot.com",
  messagingSenderId: "58984318047",
  appId: "1:58984318047:web:605fcc0006bf8c1ad787ea",
  measurementId: "G-6J671LYP2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default getFirestore(app);