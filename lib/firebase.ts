import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBgd0JhkgXxRhbsAy1k0yWMQm4qRIdekCg",
  authDomain: "pseudogram-d1ff9.firebaseapp.com",
  projectId: "pseudogram-d1ff9",
  storageBucket: "pseudogram-d1ff9.firebasestorage.app",
  messagingSenderId: "56453657763",
  appId: "1:56453657763:web:0f12d654e584f9851bfb16",
  measurementId: "G-LRZBY8VGW9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);