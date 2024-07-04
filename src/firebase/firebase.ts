import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'react-chat-ab856.firebaseapp.com',
  projectId: 'react-chat-ab856',
  storageBucket: 'react-chat-ab856.appspot.com',
  messagingSenderId: '778696075180',
  appId: '1:778696075180:web:ec6b5bf8f0bb664035bc09',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
