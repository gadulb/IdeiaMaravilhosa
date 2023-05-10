import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUx41f7OeDoWh2SmJ2MRQ9S8mjKjFNvx0",
  authDomain: "ideiamaravilhosa-7574d.firebaseapp.com",
  projectId: "ideiamaravilhosa-7574d",
  storageBucket: "ideiamaravilhosa-7574d.appspot.com",
  messagingSenderId: "951888039852",
  appId: "1:951888039852:web:184b8ce246c223c2087409"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);