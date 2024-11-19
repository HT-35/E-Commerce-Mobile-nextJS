import { user } from '@/user';
import Purchase from '@/components/user/orders/purchase';
import Canceled from '@/components/user/orders/canceled/canceled';


import React from 'react';

const OrderPage = async () => {
  // const session = await auth();

  return (
    <>
      <Purchase></Purchase>
      <Canceled></Canceled>
    </>
  );
};

export default OrderPage;
