import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpVM4qL_t8cGP4IjFuSAN54C9mHgrIFUM",
  authDomain: "online-inivitation.firebaseapp.com",
  projectId: "online-inivitation",
  storageBucket: "online-inivitation.firebasestorage.app",
  messagingSenderId: "969578271966",
  appId: "1:969578271966:web:e8b09c1e6bebc8adbb1e4f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
