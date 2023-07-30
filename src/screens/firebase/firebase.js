import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getStorage} from 'firebase/storage';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDbLPtDOXUYd547AS-ypRsV2bkSRHk74FI',
  authDomain: 'login-ashish.firebaseapp.com',
  projectId: 'login-ashish',
  storageBucket: 'login-ashish.appspot.com',
  messagingSenderId: '377316602305',
  appId: '1:377316602305:web:c4cc3a2b1f37e495e63f40',
  measurementId: 'G-KZNM3Y8BYP',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
