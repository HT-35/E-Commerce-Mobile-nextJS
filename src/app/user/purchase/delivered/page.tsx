import Purchase from '@/components/user/orders/purchase';
import Delivered from '@/components/user/orders/delivered/delivered';

import React from 'react';

const OrderPage = async () => {
  // const session = await auth();

  return (
    <>
      <Purchase></Purchase>
      <Delivered></Delivered>
    </>
  );
};

export default OrderPage;
