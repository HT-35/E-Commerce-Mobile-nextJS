import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { sendRequest } from '@/utils/fetchApi';
import { listApi_Next_Server } from '@/utils/listApi';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';

export function DeleteUser({
  activeDelete,
  setActiveDelete,
  dataDeleteUser,
  setUser,
  accessToken,
}: {
  activeDelete: boolean;
  accessToken: string;
  setUser: any;
  setActiveDelete: any;
  dataDeleteUser: { _id: string; name: string };
}) {
  const [loadding, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);
    const deleteUser = await sendRequest<IBackendRes<any>>({
      method: 'DELETE',
      url: listApi_Next_Server.deleteUser(dataDeleteUser._id),
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(`deleteUser:`, deleteUser);

    if (deleteUser.statusCode === 200) {
      setUser((prevUsers: any[]) =>
        prevUsers.filter((item) => item._id !== dataDeleteUser._id)
      );
      setActiveDelete(false);
      setLoading(false);
      toast.success(`Xóa user ${dataDeleteUser.name} Thành Công !`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } else {
      setLoading(false);
      setActiveDelete(false);
      toast.error(`Xóa user ${dataDeleteUser.name} Thất Bại !`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  return (
    <AlertDialog open={activeDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn xóa tài khoản {dataDeleteUser.name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sau khi xóa tài khoản sẽ không thể khôi phục.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setActiveDelete(false)}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            className="relative"
            onClick={() => handleDeleteUser()}
          >
            Xác Nhận Xóa
            {loadding && (
              <div className=" w-5 h-5 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin" />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
