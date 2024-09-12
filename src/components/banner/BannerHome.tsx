'use client';
import Banner1 from '@/components/banner/Banner1';
import Banner2 from '@/components/banner/Banner2';
import React, { useState, useEffect } from 'react';

const ResponsiveBanner: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    // Hàm xử lý khi kích thước màn hình thay đổi
    const handleResize = (event: MediaQueryListEvent) => {
      setIsLargeScreen(event.matches);
    };

    // Đặt giá trị ban đầu
    setIsLargeScreen(mediaQuery.matches);

    // Lắng nghe sự kiện thay đổi kích thước màn hình
    mediaQuery.addEventListener('change', handleResize);

    // Hủy lắng nghe sự kiện khi component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <div className="">
      {isLargeScreen ? (
        <div className="w-full h-14 relative my-3">
          <Banner1 />
        </div>
      ) : (
        <div className="w-full h-14 relative my-3">
          <Banner2 />
        </div>
      )}
    </div>
  );
};

export default ResponsiveBanner;
