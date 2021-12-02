import type { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Layout } from '../../components/layout';
import { Input } from '../../components/molecules/Input';
import { useAuth } from '../../lib/AuthContext';
import { useRequireLogin } from '../../utils/hooks/useRequireLogin';
import { getAuth, updateProfile } from '@firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const SignUpPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const currentUser = getAuth().currentUser;
  const { signUp } = useAuth();
  const db = getFirestore();

  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async () => {
    if (emailRef.current && passwordRef.current && userNameRef.current) {
      setLoading(true);
      try {
        const registerUser = await signUp(emailRef.current.value, passwordRef.current.value);
        await updateProfile(registerUser.user, { displayName: userNameRef.current.value });
        await setDoc(doc(db, 'users', `${registerUser.user.uid}`), {
          userName: registerUser.user.displayName,
          email: registerUser.user.email,
        });
      } catch (err) {
        alert('Error!');
        console.error(err);
      }
      setLoading(false);
    }
  };

  useRequireLogin();

  return (
    <Layout title='Sign Up Page' description='新規登録用のページ'>
      <FormBox>
        <Input
          ref={userNameRef}
          name={'userName'}
          type={'text'}
          placeholder={'ユーザー名'}
          inputFormTitle={'ユーザー名'}
        />
        <Input
          ref={emailRef}
          name={'email'}
          type={'email'}
          placeholder={'Email'}
          inputFormTitle={'Email'}
        />
        <Input
          ref={passwordRef}
          name={'password'}
          type={'password'}
          placeholder={'Password'}
          inputFormTitle={'Password'}
        />
        <button
          onClick={handleSignUp}
          disabled={loading || currentUser !== null || undefined}
          type='submit'
        >
          登録
        </button>
      </FormBox>
    </Layout>
  );
};

const FormBox = styled.form`
  height: 50vh;
  width: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #000000;
  margin: auto;
`;

export default SignUpPage;
