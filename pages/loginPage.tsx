import { VFC } from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import { InputForm } from '../components/inputForm';
import Link from 'next/link';


const LoginPage: VFC<NextPage> = () => {
  return (
    <>
    {/* <Layout 
      title='Login Page'
      description='ログインページ'
    >
    </Layout> */}
    <form>
       <InputForm
          name={'email'}
          type={'email'}
          placeholder={'Email'}
          inputFormTitle={'Email'}
        />
        <InputForm
          name={'password'}
          type={'password'}
          placeholder={'Password'}
          inputFormTitle={'Password'}
        />
        <button type='submit'>ログイン</button>
      </form>
      <Link href='/signUpPage'>新規登録</Link>
    </>
  )
}

export default LoginPage;
