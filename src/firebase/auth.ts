import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const loginAdmin = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutAdmin = () => signOut(auth);
