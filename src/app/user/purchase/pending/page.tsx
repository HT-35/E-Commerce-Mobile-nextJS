import { user } from '@/user';
import Purchase from '@/components/user/orders/purchase';
import Pending from '@/components/user/orders/pending/pending';

import React from 'react';

const OrderPage = async () => {
  // const session = await auth();

  return (
    <>
      <Purchase></Purchase>
      <Pending></Pending>
    </>
  );
};

export default OrderPage;
