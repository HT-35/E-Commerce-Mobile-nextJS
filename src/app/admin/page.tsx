'use client';
import ChatEmployee from '@/components/admin/ChatEmployee';
import LiveStreamAdmin from '@/components/admin/LiveStreamAdmin';
import MangegerAccount from '@/components/admin/MangegerAccount';
import MangegerProduct from '@/components/admin/MangegerProduct';
import { PhoneIcon } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { HomeIcon, PersonIcon, ClipboardIcon, ChatBubbleIcon, CameraIcon } from '@radix-ui/react-icons';

const MenuAdmin: {
  value: string;
  icon: JSX.Element;
  title: string;
  component?: JSX.Element;
}[] = [
  {
    value: 'home',
    icon: <HomeIcon className="w-6 h-6" />,
    title: 'Trang Chủ',
  },
  {
    value: 'managerProduct',
    icon: <PhoneIcon />,
    title: 'Quản Lý Sản Phẩm',
    component: <MangegerProduct />,
    //component: <ProductForm />,
  },
  {
    value: 'managerAccount',
    icon: <PersonIcon className="w-6 h-6" />,
    title: 'Quản Lý Tài Khoản',
    component: <MangegerAccount />,
  },
  {
    value: 'managerOrder',
    icon: <ClipboardIcon className="w-6 h-6" />,
    title: 'Quản Lý Đơn Hàng',
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
];

export default function TabsDemo() {
  return (
    <div className="xl:px-4 xl:py-2">
      <Tabs
        defaultValue="livestream"
        className=" xl:flex mt-3 items-start justify-center min-h-[500px] gap-4  max-lg:grid max-xl:grid-cols-1"
      >
        <TabsList className="  flex flex-col items-start  gap-4  h-full   bg-white px-2 max-xl:flex-row max-xl:flex-wrap max-xl:pb-5">
          {MenuAdmin.map((item, index) => {
            return (
              <TabsTrigger
                key={index}
                value={item.value}
                className="xl:min-w-[225px] flex justify-start items-center gap-3 max-xl:text-sm"
              >
                {item.icon}
                {item.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className=" w-full  h-full px-[14px]  bg-white rounded-xl  flex flex-col gap-5">
          {MenuAdmin.map((item, index) => {
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
