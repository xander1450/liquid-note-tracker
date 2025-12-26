import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBnjtzUcCbvV6kE5M_DuX-XVGzABPO0PNg",
  authDomain: "notetracker-492c1.firebaseapp.com",
  projectId: "notetracker-492c1",
  storageBucket: "notetracker-492c1.firebasestorage.app",
  messagingSenderId: "766681183448",
  appId: "1:766681183448:web:8d89e27dc2b30bab7e93ad",
  measurementId: "G-N9D1LSEGKN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
