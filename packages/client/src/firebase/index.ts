import firebase from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
