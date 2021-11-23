import { getApps, initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
// const firebase: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// export default firebase;

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
// const analytics = getAnalytics(firebaseApp);
export default initializeApp;

export const signUp = (email:string, password:string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email:string, password:string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unSub;
  },[])

  return currentUser;
};
