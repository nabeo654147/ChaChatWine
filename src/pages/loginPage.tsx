import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import Link from 'next/link';

import { Layout } from '../../components/layout';
import { Input } from '../../components/molecules/Input';
import { useAuth } from '../../lib/AuthContext';
import { useRequireLogin } from '../../utils/hooks/useRequireLogin';
import { FormBox } from './signUpPage';
import { Button } from '../../components/atoms/Button';

const LoginPage: NextPage = () => {
  const { isAnonymous, login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useRequireLogin();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(emailRef.current!.value, passwordRef.current!.value);
    } catch (err) {
      alert('このユーザーは登録されていません');
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Layout title='Login Page' description='ログインページ'>
      <FormBox>
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
          autocompleate={'current-password'}
          placeholder={'Password'}
          inputFormTitle={'Password'}
        />
        <Button
          text={'ログイン'}
          type={'submit'}
          size={'large'}
          shape={'round'}
          onClick={handleLogin}
          disabled={loading || isAnonymous === false || undefined}
          style={{ border: 'none', background: '#fd9456' }}
        />
        <Link href='/signUpPage'>
          <a>新規登録</a>
        </Link>
      </FormBox>
    </Layout>
  );
};

export default LoginPage;
