import { createContext, useState, useEffect, useContext } from 'react';

import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, User, UserCredential } from '@firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

type AuthContextType = {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

type Props = {
  children?: JSX.Element;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return auth.signOut();
};

const AuthContext = createContext<AuthContextType>({ currentUser: null, signUp, logout, login });

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div suppressHydrationWarning>Loding...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
