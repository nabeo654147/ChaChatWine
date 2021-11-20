import { NextPage } from 'next';
import { VFC } from 'react';
import { Layout } from '../components/layout';
import { InputForm } from '../components/inputForm';
 
const SignUpPage: VFC<NextPage> = () => {
  return (
    <>
      {/* <Layout
        title='Sign Up Page'
        description='新規登録用のページ'
      >
      </Layout> */}
      <h1>Sign Up</h1>
      <form>
        <InputForm
          name={'userName'}
          type={'text'}
          placeholder={'ユーザー名'}
          inputFormTitle={'ユーザー名'}
        />
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
        <button type='submit'>登録</button>
      </form>
    </>
  )
}

export default SignUpPage;
