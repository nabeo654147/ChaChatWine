import type { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Layout } from '../../components/layout';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { useAuth } from '../../lib/AuthContext';
import { useRequireLogin } from '../../utils/hooks/useRequireLogin';
import { updateProfile } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { pc, tab, sp } from '../../lib/media';

const SignUpPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { currentUser, signUp } = useAuth();

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
          uid: registerUser.user.uid,
        });
      } catch (error) {
        alert('Error!');
        console.log(error);
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
          autocompleate={'username'}
          placeholder={'ユーザー名'}
          inputFormTitle={'ユーザー名'}
        />
        <Input
          ref={emailRef}
          name={'email'}
          type={'email'}
          autocompleate={'username'}
          placeholder={'Email'}
          inputFormTitle={'Email'}
        />
        <Input
          ref={passwordRef}
          name={'password'}
          type={'password'}
          autocompleate={'new-password'}
          placeholder={'Password'}
          inputFormTitle={'Password'}
        />
        <Button
          text={'登録'}
          type={'submit'}
          size={'large'}
          shape={'round'}
          onClick={handleSignUp}
          disabled={loading || currentUser !== null || undefined}
        />
      </FormBox>
    </Layout>
  );
};

export const FormBox = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 25rem;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #fffde1c7;
  box-shadow: 6px 4px 5px #66655e;
  border-radius: 5rem;
  border: none;
  ${pc`
      height:30rem;
      width: 60%
  `}
  ${tab` 
      width: 70%
  `}
  ${sp` 
      width: 90%
  `}
  Input {
    border: none;
    min-height: 2.8rem;
    background: #ffffff;
    ${pc` 
      width: 32rem;
    `}
    ${tab`
      width: 23rem;
    `}
  }
  div {
    color: #ff7d31;
  }
  button {
    background: #fd9456;
  }
`;

export default SignUpPage;
