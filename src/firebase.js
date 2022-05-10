import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAE6KCQTE2AqyUnyFF9kPbB21t5Mh6WUVw",
    authDomain: "borhan-verification.firebaseapp.com",
    projectId: "borhan-verification",
    storageBucket: "borhan-verification.appspot.com",
    messagingSenderId: "154873586162",
    appId: "1:154873586162:web:98cb477b9cd0019e7f8b6b"
  
  };
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);






