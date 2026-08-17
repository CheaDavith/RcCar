// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8pDSfE-5880ubvOdq_vDV_IaNnbvx6Bo",
  authDomain: "rc-car-system.firebaseapp.com",
  projectId: "rc-car-system",
  storageBucket: "rc-car-system.firebasestorage.app",
  messagingSenderId: "344515235076",
  appId: "1:344515235076:web:ca2679201aa9180ef01451",
  measurementId: "G-F7ZH4PGP70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);