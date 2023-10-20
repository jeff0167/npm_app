import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBABZoB05fDHdAmIyzNKoldzWQLA5w_uGE",
  authDomain: "npmwebapp.firebaseapp.com",
  projectId: "npmwebapp",
  storageBucket: "npmwebapp.appspot.com",
  messagingSenderId: "683567587032",
  appId: "1:683567587032:web:0529bb896a094c781201ad",
  measurementId: "G-GXMMH0FQCF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);