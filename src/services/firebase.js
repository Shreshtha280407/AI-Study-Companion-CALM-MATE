import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Check if config is actually provided to prevent blank screen crashes
const isConfigValid = !!firebaseConfig.apiKey;

let firebaseApp;
let auth;
let db;

if (isConfigValid) {
  firebaseApp = initializeApp(firebaseConfig)
  auth = getAuth(firebaseApp)
  db = getFirestore(firebaseApp)
} else {
  console.error("🔥 FIREBASE MISSING: Please add your Firebase credentials to the .env file. The app will not work until you do.");
  // Mock auth object to prevent immediate destructuring crashes elsewhere
  auth = { onAuthStateChanged: () => () => {} }; 
}

export { firebaseApp, auth, db, isConfigValid }
