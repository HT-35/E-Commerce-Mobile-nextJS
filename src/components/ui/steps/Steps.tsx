import React, { useState } from "react";

import { Button, Steps } from "antd";

const ActiveStep = ({ current, steps }: { current: number; steps: any }) => {
  return (
    <>
      <Steps current={current} items={steps} />
    </>
  );
};

export default ActiveStep;
