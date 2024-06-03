import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAoUXnY2UyQ9wOhvUfquNpqrNhRCTi7fxA",
  authDomain: "frndgpt-a0222.firebaseapp.com",
  projectId: "frndgpt-a0222",
  storageBucket: "frndgpt-a0222.appspot.com",
  messagingSenderId: "747418035666",
  appId: "1:747418035666:web:87314f62a8d3f3c31d540b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
