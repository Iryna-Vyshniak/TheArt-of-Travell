import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ0lukKkCVw80VRLDprTn0FIqdeS-INRo',
  authDomain: 'theart-of-travel.firebaseapp.com',
  projectId: 'theart-of-travel',
  storageBucket: 'theart-of-travel.appspot.com',
  messagingSenderId: '1097815860473',
  appId: '1:1097815860473:web:569112da3e3771ad332e28',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
