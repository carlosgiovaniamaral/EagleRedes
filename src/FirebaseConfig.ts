import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyDdraYtzz-eKFkGbQez3bnrrnSZbwX-eg8',
  authDomain: 'eaglechecklist.firebaseapp.com',
  projectId: 'eaglechecklist',
  storageBucket: 'eaglechecklist.appspot.com',
  messagingSenderId: '799082709655',
  appId: '1:799082709655:web:653d521c96c17e1e339fd2',
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebaseAuth.initializeAuth(app);