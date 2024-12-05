import React from 'react';

const LoadingSkeleton = ({ className }: { className: string }) => {
  return <div className={`bg-slate-500 		animate-pulse ${className} 		`}></div>;
};

export default LoadingSkeleton;
