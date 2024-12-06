'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

// =========

import { defineStepper } from '@stepperize/react';
import { sendRequest } from '@/utils/fetchApi';
import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { listApi_Next_Server } from '@/utils/listApi';

const { useStepper, Scoped } = defineStepper({ id: 'first' }, { id: 'second' });

// =========
export default function ModalActiveAccount({
  open,
  setOpen,
  idUser,
}: {
  open?: boolean;
  setOpen: any;
  idUser: string;
}) {
  //const stepper = useStepper();
  const [codeID, setCodeID] = useState<string>('');
  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[800px] lg:min-h-[600px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Kích Hoạt Tài Khoản</DialogTitle>
        </DialogHeader>
        <Scoped>
          <MySteps setCodeID={setCodeID} />
          <MyActions setOpen={setOpen} codeID={codeID} idUser={idUser} />
        </Scoped>
      </DialogContent>
    </Dialog>
  );
}
const MySteps = ({ setCodeID }: { setCodeID: any }) => {
  const stepper = useStepper();

  return (
    <div className="flex flex-col gap-4 bg-gray-3 p-4 my-4 rounded-md lg:min-h-[400px]">
      {stepper.when('first', () => (
        <>
          <DialogHeader>
            <DialogDescription className="text-black">
              Mã Xác Thực Đã Được Gửi Tới Email Của Bạn, Bạn Vui Lòng Kiểm Tra
              Email.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col justify-start items-start  gap-2">
              <Label htmlFor="OTP" className="text-right text-slate-500">
                Mã Xác Thực
              </Label>
              <Input
                id="OTP"
                className=""
                onChange={(e) => {
                  setCodeID(e.target.value);
                }}
              />
            </div>
          </div>
        </>
      ))}

      {stepper.when('second', () => (
        <p>
          Bạn Đã Kích Hoạt Tài Khoản Thành Công, Vui lòng tiến hành đăng nhập.
        </p>
      ))}
    </div>
  );
};

const MyActions = ({
  setOpen,
  codeID,
  idUser,
}: {
  setOpen: any;
  codeID: string;
  idUser: string;
}) => {
  const stepper = useStepper();

  const router = useRouter();

  const handleActiveAccount = async () => {
    const activeAccount = await sendRequest<IBackendRes<any>>({
      method: 'POST',
      url: listApi_Next_Server.activeAcount(),
      body: {
        codeId: codeID,
        id: idUser,
      },
    });

    if (activeAccount.statusCode === 201) {
      stepper.next();
    } else {
      toast.error('Bạn đã nhập sai mã OTP, vui lòng kiểm tra lại !', {
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
    //activeAccount();
    console.log(activeAccount);
  };

  const reload = () => {
    window.location.reload();
    setOpen(false);
    //router.refresh();
  };

  return !stepper.isLast ? (
    <div className="flex items-center gap-2">
      <Button onClick={handleActiveAccount}>Tiếp Theo</Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button onClick={reload}>
        <DialogClose>Hoàn Tất</DialogClose>
      </Button>
    </div>
  );
};
