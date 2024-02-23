// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApvKHWg3dtXolwVTpFE8_yMDNyKtb1qZs",
  authDomain: "galya-9b397.firebaseapp.com",
  projectId: "galya-9b397",
  storageBucket: "galya-9b397.appspot.com",
  messagingSenderId: "202916229123",
  appId: "1:202916229123:web:18a7270a6dda2dee079e36",
  measurementId: "G-J0QS8X2DG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics =
  app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
