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

const { useStepper, Scoped } = defineStepper({ id: 'first' }, { id: 'second' });

// =========
export default function ModalActiveAccount({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen: any;
}) {
  //const stepper = useStepper();
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
          <MySteps />
          <MyActions setOpen={setOpen} />
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
          </div>
        </>
      ))}

      {stepper.when('second', () => (
        <p>Bạn Đã Kích Hoạt Tài Khoản Thành Công.</p>
      ))}
    </div>
  );
};

const MyActions = ({ setOpen }: { setOpen: any }) => {
  const stepper = useStepper();

  return !stepper.isLast ? (
    <div className="flex items-center gap-2">
      <Button onClick={stepper.next}>Tiếp Theo</Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button onClick={() => setOpen(false)}>
        <DialogClose>Hoàn Tất</DialogClose>
      </Button>
    </div>
  );
};
