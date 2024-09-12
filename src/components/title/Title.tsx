/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

const Title = ({
  children,
  className,
  ...props
}: {
  children: string;
  className?: string;
  props?: React.ReactNode;
}) => {
  return (
    <h1
      className={`font-bold text-xl px-2 py-1 lg:basis-2/5     max-lg:text-base ${className}`}
    >
      {children}
    </h1>
  );
};

export default Title;
