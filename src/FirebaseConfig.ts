import { initializeApp } from 'firebase/app';
import { getAuth, signOut as authSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDdraYtzz-eKFkGbQez3bnrrnSZbwX-eg8',
  authDomain: 'eaglechecklist.firebaseapp.com',
  projectId: 'eaglechecklist',
  storageBucket: 'eaglechecklist.appspot.com',
  messagingSenderId: '799082709655',
  appId: '1:799082709655:web:653d521c96c17e1e339fd2',
};

const app = initializeApp(firebaseConfig);

// Configuração do Firebase Authentication
const auth = getAuth(app);

// Configuração do Firebase Firestore
const db = getFirestore(app);

// Configuração do Firebase Storage
const storage = getStorage(app);

// Exportando a função signOut do módulo firebase/auth com um alias
const signOut = authSignOut;

export { auth, db, storage, signOut };
