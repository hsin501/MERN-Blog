// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-9fcf3.firebaseapp.com',
  projectId: 'mern-blog-9fcf3',
  storageBucket: 'mern-blog-9fcf3.appspot.com',
  messagingSenderId: '64577017630',
  appId: '1:64577017630:web:b8fb890a9afec5dcef5b0f',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
