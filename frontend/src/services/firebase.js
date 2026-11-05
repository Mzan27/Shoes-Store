import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCZVRXtstCzpWpjrTYqexHkjH1fN01nQas",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "stepup-shoes-store-2bd6b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "stepup-shoes-store-2bd6b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "stepup-shoes-store-2bd6b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "973276165210",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:973276165210:web:0a61fb1937f4c242321463",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HCQVXWKMTN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app);

export default app;

