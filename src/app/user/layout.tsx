'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PersonIcon, UpdateIcon, ResetIcon, ReaderIcon } from '@radix-ui/react-icons';

const LayOutUser = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const menuItems = [
    { path: '/user/profile', label: 'Tài khoản của bạn', icon: <PersonIcon /> },
    { path: '/user/password', label: 'Đổi mật khẩu', icon: <UpdateIcon /> },
    { path: '/user/purchase', label: 'Lịch sử mua hàng', icon: <ReaderIcon /> },
    { path: '', label: 'Thoát tài khoản', icon: <ResetIcon /> },
  ];

  return (
    <div className="max-w-[1200px] px-2 w-full !w-full flex justify-center mt-5">
      <div className="bg-[#f6fbfc] rounded-sm w-[253px]">
        <div className="block-menu bg-[#f6fbfc] rounded-xl p-2.5 sticky">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`block-menu__item-menu cursor-pointer mb-4 p-[0.5px_10px] relative ${
                pathname === item.path ? 'bg-[#fee] border border-[#e11b1e] rounded-xl text-[#e11b1e]' : ''
              }`}
            >
              <div className="item-menu flex items-center justify-start py-1.5">
                <span className={`${pathname === item.path ? 'text-[#e11b1e]' : ''}`}>
                  {item.icon}
                </span>
                <Link href={item.path} className={`ml-2 ${pathname === item.path ? 'text-[#e11b1e]' : ''}`}>
                  {item.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ml-[18px] w-[927px]">{children}</div>
    </div>
  );
};

export default LayOutUser;
