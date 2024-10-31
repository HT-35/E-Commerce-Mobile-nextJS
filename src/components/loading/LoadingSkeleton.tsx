import React from 'react';
/**
 *
 * >>>>>thêm width, height
 *
 */
const LoadingSkeleton = ({ className }: { className: string }) => {
  return <div className={`bg-slate-500 		animate-pulse ${className} 		`}></div>;
};

export default LoadingSkeleton;
