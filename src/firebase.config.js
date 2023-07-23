import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB9FlD4IT9Lv7N64YwhL_gBqzU4peaheWs",
  authDomain: "finaldogsite.firebaseapp.com",
  projectId: "finaldogsite",
  storageBucket: "finaldogsite.appspot.com",
  messagingSenderId: "528397961266",
  appId: "1:528397961266:web:03c02d89890c4597b7d42b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()