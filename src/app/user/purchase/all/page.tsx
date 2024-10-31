import Purchase from '@/components/user/orders/purchase';
import All from '@/components/user/orders/all/all';

import React from 'react';

const OrderPage = async () => {
  // const session = await auth();

  return (
    <>
      <Purchase>{''}</Purchase>
      <All></All>
    </>
  );
};

export default OrderPage;
