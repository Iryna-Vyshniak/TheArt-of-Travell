import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
