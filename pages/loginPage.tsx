import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Layout } from '../components/layout';
import { InputForm } from '../components/molecules/InputForm';
import { useAuth } from '../lib/AuthContext';
import { useRequireLogin } from '../utils/hooks/useRequireLogin';

const LoginPage: NextPage = () => {
  const { currentUser, login, logout } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useRequireLogin();

  const handleLogin = async() => {
    setLoading(true);
    try{
      await login(emailRef.current!.value, passwordRef.current!.value);
    } catch (err) {
      alert('このユーザーは登録されていません');
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Layout 
      title='Login Page'
      description='ログインページ'
    >
    <FormWrap>
    <FormBox>
      <InputForm
        ref={emailRef}
        name={'email'}
        type={'email'}
        placeholder={'Email'}
        inputFormTitle={'Email'}
      />
      <InputForm
        ref={passwordRef}
        name={'password'}
        type={'password'}
        placeholder={'Password'}
        inputFormTitle={'Password'}
      />
        <LoginButton onClick={handleLogin} disabled={ loading  || currentUser !== null || undefined } type='submit'>ログイン</LoginButton>
        <Link href='/signUpPage'><a>新規登録</a></Link>
      </FormBox>
      </FormWrap>
      <button onClick={logout} disabled={ loading || !currentUser} >ログアウト</button>
    </Layout>
  )
}

export default LoginPage;

const FormBox = styled.form`
  height: 50vh;
  width: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 2px solid #000000;
  margin: auto;
  background: #ffb67a;
`

const LoginButton = styled.button`
  border-radius: 40%;
  font-size: 2rem;
`

const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`
