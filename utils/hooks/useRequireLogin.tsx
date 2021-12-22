import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from '@firebase/auth';

export const useRequireLogin = () => {
  const currentUser = getAuth().currentUser;
  const router = useRouter();
  const AuthChecking = currentUser === undefined;

  useEffect(() => {
    if (AuthChecking) return;
    if (currentUser) router.push('/');
    return () => {
      router.events.off('hashChangeStart', useRequireLogin);
    };
  }, [currentUser]);
};
