import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ0lukKkCVw80VRLDprTn0FIqdeS-INRo',
  authDomain: 'theart-of-travel.firebaseapp.com',
  projectId: 'theart-of-travel',
  storageBucket: 'theart-of-travel.appspot.com',
  messagingSenderId: '1097815860473',
  appId: '1:1097815860473:web:569112da3e3771ad332e28',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
