'use client';
import React, { useEffect, useState } from 'react';

const useScreen = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false); // useState luôn được gọi

  useEffect(() => {
    setIsMounted(true); // Chỉ định rằng component đã mount
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

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
  }, []); // useEffect vẫn được gọi mà không phụ thuộc vào isMounted

  if (!isMounted) return null; // Chỉ render sau khi component đã mount
  return { isLargeScreen, isMounted };
};

export default useScreen;
