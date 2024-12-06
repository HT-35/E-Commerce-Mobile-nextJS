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

export function AcceptDeleteProduct({
  acceptDelete,
  setAcceptDelete,
  dataDeleteProdcut,
  setProduct,
  accessToken,
}: {
  acceptDelete: boolean;
  accessToken: string;
  setProduct: any;
  setAcceptDelete: any;
  dataDeleteProdcut: { slug: string; name: string };
}) {
  const [loadding, setLoading] = useState(false);

  const handleDeleteProduct = async (slug: string, name: string) => {
    setLoading(true);
    const deleteProduct = await sendRequest<IBackendRes<any>>({
      method: 'DELETE',

      url: listApi_Next_Server.detailProductSearchParam(slug),
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(`deleteProduct:`, deleteProduct);

    if (deleteProduct.statusCode === 200) {
      setProduct((prevProducts: any[]) =>
        prevProducts.filter((item) => item.slug !== slug)
      );
      setAcceptDelete(false);
      toast.success(`Xóa Sản Phẩm ${name} Thành Công !`, {
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
      setLoading(false);
    } else {
      setLoading(false);
      setAcceptDelete(false);
      toast.error(`Xóa Sản Phẩm ${name} Thất Bại !`, {
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
    <AlertDialog open={acceptDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn xóa sản phẩm {dataDeleteProdcut.name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sau khi xóa sản phẩm sẽ không thể khôi phục.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAcceptDelete(false)}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            className="relative"
            onClick={() =>
              handleDeleteProduct(
                dataDeleteProdcut.slug,
                dataDeleteProdcut.name
              )
            }
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
