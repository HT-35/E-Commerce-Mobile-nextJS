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
import React from 'react';

// =========

import { defineStepper } from '@stepperize/react';

const { useStepper, Scoped } = defineStepper(
  { id: 'first' },
  { id: 'second' },
  { id: 'third' }
);

// =========
export default function ModalForgetPassword({
  children,
}: {
  children: React.ReactNode;
}) {
  //const stepper = useStepper();
  return (
    <Dialog
      modal={true}
      //onEscapeKeyDown={(e) => e.preventDefault()}
      //onInteractOutside={(e) => e.preventDefault()}
    >
      <DialogTrigger asChild>
        <Button variant="link" className="text-slate-400 text-xm">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] lg:min-h-[600px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Quên Mật Khẩu</DialogTitle>
        </DialogHeader>
        <Scoped>
          <MySteps />
          <MyActions />
        </Scoped>
      </DialogContent>
    </Dialog>
  );
}
const MySteps = () => {
  const stepper = useStepper();

  return (
    <div className="flex flex-col gap-4 bg-gray-3 p-4 my-4 rounded-md lg:min-h-[400px]">
      {stepper.when('first', () => (
        <>
          <DialogHeader>
            <DialogDescription className="text-black">
              Hãy nhập số điện thoại/email của bạn vào bên dưới để bắt đầu quá
              trình khôi phục mật khẩu.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start w-full gap-2">
              <Label htmlFor="email" className="text-right text-slate-500 ">
                Email
              </Label>
              <Input
                id="email"
                autoComplete="off"
                placeholder="Nhập email của bạn"
                className=""
              />
            </div>
          </div>
        </>
      ))}

      {stepper.when('second', () => (
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
              <Input id="OTP" className="" />
            </div>
            <div className="flex flex-col justify-start items-start  gap-2">
              <Label htmlFor="password" className="text-right text-slate-500">
                Nhập Mật Khẩu Mới
              </Label>
              <Input id="password" className="" />
            </div>
            <div className="flex flex-col justify-start items-start  gap-2">
              <Label htmlFor="rePassword" className="text-right text-slate-500">
                Nhập Lại Mật Khẩu
              </Label>
              <Input id="rePassword" className="" />
            </div>
          </div>
        </>
      ))}

      {stepper.when('third', () => (
        <p>Bạn Đã Thay Đổi Mật Khẩu Thành Công .</p>
      ))}
    </div>
  );
};

const MyActions = () => {
  const stepper = useStepper();

  return !stepper.isLast ? (
    <div className="flex items-center gap-2">
      <Button
        onClick={stepper.prev}
        className={`${stepper.isFirst ? 'hidden' : ''}`}
      >
        Quay Lại
      </Button>

      <Button onClick={stepper.next}>Tiếp Theo</Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button onClick={stepper.reset}>
        <DialogClose>Hoàn Tất</DialogClose>
      </Button>
    </div>
  );
};
