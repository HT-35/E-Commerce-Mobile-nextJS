import FormProfile from '@/components/user/profile';

import React from 'react';

const ProfilePage = async () => {
  // const session = await auth();

  return (
    <>
      <h1 className="lg:text-3xl max-lg:text-xl">Hồ Sơ Của Tôi</h1>
      <div className="overflow-x-auto max-sm:w-[350px]  max-md:w-[650px] max-lg:w-[900px]">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </div>
      <FormProfile></FormProfile>
    </>
  );
};

export default ProfilePage;
