'use client';
import ChatEmployee from '@/components/admin/ChatEmployee';
import DashboardAdmin from '@/components/admin/DashboadAdmin';
import LiveStreamAdmin from '@/components/admin/LiveStreamAdmin';
import MangegerAccount from '@/components/admin/MangegerAccount';
import MangegerOrder from '@/components/admin/MangegerOrder';
import MangegerProduct from '@/components/admin/MangegerProduct';
import useScreen from '@/components/hooks/useScreen';
import { PhoneIcon } from '@/components/icons';
import { DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Next_Server } from '@/utils/listApi';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import {
  HomeIcon,
  PersonIcon,
  ClipboardIcon,
  ChatBubbleIcon,
  CameraIcon,
  Cross1Icon,
  HamburgerMenuIcon,
  FileIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

const handleLogout = async (router: { push: (arg0: string) => void; refresh: () => void }) => {
  await sendRequest({
    method: 'POST',
    url: listApi_Next_Server.logout(),
  });
  //router.push('/');
  //router.refresh();
  window.location.href = '/auth';
};

const MenuAdmin: {
  value: string;
  icon: JSX.Element;
  title: string;
  onClick?: any;
  component?: JSX.Element;
}[] = [
  {
    value: 'home',
    icon: <HomeIcon className="w-6 h-6" />,
    title: 'Trang Chủ',
    component: <DashboardAdmin />,
  },
  {
    value: 'managerAccount',
    icon: <PersonIcon className="w-6 h-6" />,
    title: 'Quản Lý Tài Khoản',
    component: <MangegerAccount />,
  },
  {
    value: 'managerProduct',
    icon: <PhoneIcon />,
    title: 'Quản Lý Sản Phẩm',
    component: <MangegerProduct />,
    //component: <ProductForm />,
  },
  {
    value: 'managerOrder',
    icon: <ClipboardIcon className="w-6 h-6" />,
    title: 'Quản Lý Đơn Hàng',
    component: <MangegerOrder />,
  },
  {
    value: 'chat',
    icon: <ChatBubbleIcon className="w-6 h-6" />,
    title: 'Chat',
    component: <ChatEmployee />,
  },
  {
    value: 'livestream',
    icon: <CameraIcon className="w-6 h-6" />,
    title: 'Livestream',
    component: <LiveStreamAdmin />,
  },
  {
    value: 'logout',
    icon: <TriangleRightIcon className="w-6 h-6" />,
    title: 'LogOut',
    onClick: handleLogout,
    component: (
      <div className="max-w-[300px] flex justify-center flex-col items-center mx-auto mt-20">
        <div className=" w-32 h-32 rounded-full border-8 border-black border-t-transparent border-b-transparent animate-spin"></div>
        <div className="text-2xl mt-10 text-center">Đăng Xuất</div>
      </div>
    ),
  },
];

export default function TabsDemo() {
  const [active, setActive] = useState(false);

  const router = useRouter();

  const handleActive = () => {
    setActive((prev) => !prev);
  };

  const isLargeScreen = useScreen()?.isLargeScreen ?? false;

  return (
    <div className="xl:px-10 px-4 ">
      <Tabs defaultValue="home" className="  gap-2  grid grid-cols-1">
        {isLargeScreen ? (
          <>
            <TabsList
              className="   xl:h-[80px] h-auto  bg-white rounded-md px-2 py-2 
        flex justify-between items-center flex-row   max-xl:flex-wrap "
            >
              {MenuAdmin?.length > 0 &&
                MenuAdmin?.map((item, index) => {
                  return (
                    <TabsTrigger
                      key={index}
                      value={item.value}
                      className="xl:min-w-[190px] flex justify-start items-center gap-3 max-xl:text-sm"
                      onClick={item?.onClick}
                    >
                      {item.icon}
                      {item.title}
                    </TabsTrigger>
                  );
                })}
            </TabsList>
          </>
        ) : (
          <>
            <TabsList
              className="   xl:h-[80px] h-auto  bg-white rounded-md px-2 py-2 
        flex justify-between items-center flex-row   max-xl:flex-wrap "
            >
              <TabsTrigger
                value={'home'}
                className="xl:min-w-[200px] flex justify-start items-center gap-3 max-xl:text-sm"
              >
                <HomeIcon className="w-6 h-6" />
                Trang Chủ
              </TabsTrigger>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={() => handleActive()}>
                  {active ? <Cross1Icon height={40} width={40} /> : <HamburgerMenuIcon height={40} width={40} />}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 bg-slate-300 text-black p-2 rounded-lg relative z-[9999]">
                  <DropdownMenuGroup>
                    {MenuAdmin?.length > 0 &&
                      MenuAdmin?.map((item, index) => {
                        if (index === 0) {
                          return;
                        }
                        return (
                          <TabsTrigger
                            key={index}
                            value={item.value}
                            className="w-full flex justify-start items-center gap-3 max-xl:text-sm"
                            onClick={item?.onClick}
                          >
                            {item.icon}
                            {item.title}
                          </TabsTrigger>
                        );
                      })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsList>
          </>
        )}

        <div className=" w-full xl:h-[630px] px-[14px]  bg-white rounded-xl  flex flex-col gap-5">
          {MenuAdmin?.length > 0 &&
            MenuAdmin?.map((item, index) => {
              //if (item.value === 'logout') {
              //  //handleLogout();
              //  return <div key={index} onClick={handleLogout}></div>;
              //}
              return (
                <TabsContent key={index} value={item.value}>
                  {item.component}
                </TabsContent>
              );
            })}
        </div>
      </Tabs>
    </div>
  );
}
