'use client';
import React, { useState } from 'react';

const useActive = (initialValue: any) => {
  const [active, setActive] = useState<any>(initialValue);

  const handleActive = () => {
    setActive((prv: any) => !prv);
  };

  return { active, handleActive };
};

export default useActive;
