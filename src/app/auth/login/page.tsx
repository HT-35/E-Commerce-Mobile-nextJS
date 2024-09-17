import { auth } from '@/auth';
import FormLogin from '@/components/auth/login';

import React from 'react';

const LoginPage = async () => {
  // const session = await auth();

  return (
    <>
      <h1 className="lg:text-3xl max-lg:text-xl text-center">LOGIN</h1>
      <FormLogin></FormLogin>
    </>
  );
};

export default LoginPage;
