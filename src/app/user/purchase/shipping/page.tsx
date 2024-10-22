import { user } from '@/user';
import Purchase from '@/components/user/orders/purchase';
import Shipping from '@/components/user/orders/shipping/shipping';


import React from 'react';

const OrderPage = async () => {
  // const session = await auth();

  return (
    <>
      <Purchase></Purchase>
      <Shipping></Shipping>
    </>
  );
};

export default OrderPage;
