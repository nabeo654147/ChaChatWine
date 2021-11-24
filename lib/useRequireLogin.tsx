import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

export const useRequireLogin = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const AuthChecking = currentUser === undefined;

  useEffect(() => {
    if (AuthChecking) return;
    if (currentUser) router.push('/');
  }, [currentUser])
};
