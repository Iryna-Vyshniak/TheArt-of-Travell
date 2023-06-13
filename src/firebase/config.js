// initialize the project
import { initializeApp } from 'firebase/app';
// Function for connecting the database to the project
import { getFirestore } from 'firebase/firestore';
// Function for connecting file storage to the project
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
// import { API_KEY } from 'react-native-dotenv';

const firebaseConfig = {
  apiKey: 'AIzaSyAY1V_g8F-nGX6LZWaUN1T_45-WUmDdqlQ',
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
