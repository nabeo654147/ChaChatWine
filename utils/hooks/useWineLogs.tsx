import { setDoc } from '@firebase/firestore';
import { doc } from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { db } from '../../lib/firebase';
import { Timestamp } from 'firebase/firestore';

export type LogValuesProps = {
  recommendation?: string,
  name?: string,
  country?: string,
  area?: string,
  type?: string,
  vintage?: string,
  price?: string,
  date?: Timestamp,
  favorability?: string,
  comment?: string
}

const useWineLogs = async(logValues: LogValuesProps) => {
  const { currentUser } = useAuth();
  
  try {
    await setDoc(doc(db, 'users', `${currentUser?.uid}`), {
      userLogValues: logValues
    },{ merge: true })
  } catch (error) {
    return Promise.reject(error);
  }

  const userLogValues = useMemo(() => ({
    recommendation: currentUser?.userLogValues?.recommendation ,
    name: currentUser?.userLogValues?.name ,
    country: currentUser?.userLogValues?.country ,
    area: currentUser?.userLogValues?.area ,
    type: currentUser?.userLogValues?.type ,
    vintage: currentUser?.userLogValues?.vintage ,
    price: currentUser?.userLogValues?.price ,
    date: currentUser?.userLogValues?.date ,
    favorability: currentUser?.userLogValues?.favorability ,
    comment: currentUser?.userLogValues?.comment
  }),
  [currentUser]);

  const saveImg = useCallback( async() => {
    if (currentUser === null) return;
    
  },[])
  

  return {
    userLogValues,
  };
};

export default useWineLogs;
