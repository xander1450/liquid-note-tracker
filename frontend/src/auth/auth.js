import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
