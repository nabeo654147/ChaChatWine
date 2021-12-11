import { createContext, useState, useEffect, useContext } from 'react';

import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, getAuth, User, UserCredential } from '@firebase/auth';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';

type AuthContextType = {
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  isAnonymous?: boolean;
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

const AuthContext = createContext<AuthContextType>({ signUp, logout, login });

//プロバイダーは状態を管理するものなので、変わらないsignUpなどは別でutilなどに切り出しても良いかも
const AuthProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAnonymous = getAuth().currentUser?.isAnonymous;

  useEffect(() => {
    return auth.onAuthStateChanged(async (user: User | null) => {
      if (!user) {
        signInAnonymously(auth);
      } else {
        setCurrentUser(user);
        setIsLoading(false);
      }
    });
  }, []);

  const value: AuthContextType = {
    signUp,
    login,
    logout,
    isAnonymous,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <p>Loding...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
