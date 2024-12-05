'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  PersonIcon,
  UpdateIcon,
  ResetIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';
import { sendRequest } from '@/utils/fetchApi';
import { listApi } from '@/utils/listApi';

const LayOutUser = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      path: '/user/profile',
      label: 'Tài khoản của bạn',
      icon: <PersonIcon />,
    },
    {
      path: '/user/password',
      label: 'Đổi mật khẩu',
      icon: <UpdateIcon />,
    },
    {
      path: '/user/purchase/pending', // Gốc cho tất cả đường dẫn liên quan đến lịch sử mua hàng
      label: 'Lịch sử mua hàng',
      icon: <ReaderIcon />,
      subPaths: [
        '/user/purchase/all',
        '/user/purchase/pending',
        '/user/purchase/confirmed',
        '/user/purchase/shipping',
        '/user/purchase/delivered',
        '/user/purchase/canceled',
      ],
    },
    {
      path: '',
      label: 'Thoát tài khoản',
      icon: <ResetIcon />,
    },
  ];

  const handleLogout = async () => {
    await sendRequest({
      method: 'POST',
      url: listApi.logout(),
    });
    router.push('/');
    router.refresh();
  };

  // Hàm kiểm tra menu nào đang active
  const isActive = (itemPath: string, subPaths?: string[]) => {
    if (pathname === itemPath) return true;
    if (subPaths)
      return subPaths.some((subPath) => pathname.startsWith(subPath)); // Kiểm tra các subPath
    return false;
  };

  return (
    <div className="max-w-[1200px] px-2 w-full flex justify-center mt-5">
      <div className="bg-[#f6fbfc] rounded-sm w-[253px]">
        <div className="block-menu bg-[#f6fbfc] rounded-xl p-2.5 sticky">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`block-menu__item-menu cursor-pointer mb-4 p-[0.5px_10px] relative ${
                isActive(item.path, item.subPaths)
                  ? 'bg-[#fee] border border-[#e11b1e] rounded-xl text-[#e11b1e]'
                  : ''
              }`}
              onClick={
                item.label === 'Thoát tài khoản' ? handleLogout : undefined
              }
            >
              <div className="item-menu flex items-center justify-start py-1.5">
                <span
                  className={`${isActive(item.path, item.subPaths) ? 'text-[#e11b1e]' : ''}`}
                >
                  {item.icon}
                </span>
                {item.path ? (
                  <Link
                    href={item.path}
                    className={`ml-2 ${isActive(item.path, item.subPaths) ? 'text-[#e11b1e]' : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`ml-2 ${isActive(item.path, item.subPaths) ? 'text-[#e11b1e]' : ''}`}
                  >
                    {item.label}
                  </span>
                )}
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
