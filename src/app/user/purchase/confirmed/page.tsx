import Purchase from '@/components/user/orders/purchase';
import Confirmed from '@/components/user/orders/confirmed/confirmed';

import React from 'react';

const OrderPage = async () => {
  // const session = await auth();

  return (
    <>
      <Purchase></Purchase>
      <Confirmed></Confirmed>
    </>
  );
};

export default OrderPage;
