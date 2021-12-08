import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';

export const useRequireLogin = () => {
  const { isAnonymous } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAnonymous === true) return;
    if (isAnonymous === false) router.push('/');
  }, [isAnonymous]);
};
