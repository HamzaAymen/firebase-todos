import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFIfvfyEkNjKvAX28tAwB71FfbnSZKPdI",
  authDomain: "fir-todo-dab28.firebaseapp.com",
  projectId: "fir-todo-dab28",
  storageBucket: "fir-todo-dab28.appspot.com",
  messagingSenderId: "624930851449",
  appId: "1:624930851449:web:9bb856d8b26387508d62a8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
