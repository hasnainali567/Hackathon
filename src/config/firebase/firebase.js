import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkf0RgU4KpVufiGKeWaXX7FZi9aPd4o4Y",
  authDomain: "react-chat-app-85acb.firebaseapp.com",
  projectId: "react-chat-app-85acb",
  storageBucket: "react-chat-app-85acb.firebasestorage.app",
  messagingSenderId: "300765976893",
  appId: "1:300765976893:web:5fffee0ea22915ecda4d54"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
  auth,
  db
}