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
import {
  listApi_Nest_Server,
  listApi_Nest_Server_API_Route,
} from '@/utils/listApi';
import { Bounce, toast } from 'react-toastify';

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

  const [email, setEmail] = useState<string>('');
  const [codeId, setCodeId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <Dialog modal={true}>
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
          <MySteps
            setEmail={setEmail}
            setCodeId={setCodeId}
            setPassword={setPassword}
          />
          <MyActions email={email} codeId={codeId} password={password} />
        </Scoped>
      </DialogContent>
    </Dialog>
  );
}
const MySteps = ({
  setEmail,
  setCodeId,
  setPassword,
}: {
  setEmail: any;
  setCodeId: any;
  setPassword: any;
}) => {
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
                onChange={(e) => setEmail(e.target.value)}
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
              <Input
                id="OTP"
                className=""
                onChange={(e) => setCodeId(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-start items-start  gap-2">
              <Label htmlFor="password" className="text-right text-slate-500">
                Nhập Mật Khẩu Mới
              </Label>
              <Input
                id="password"
                className=""
                onChange={(e) => setPassword(e.target.value)}
              />
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

const MyActions = ({
  email,
  codeId,
  password,
}: {
  email: string;
  password: string;
  codeId: string;
}) => {
  const stepper = useStepper();
  const [idUser, setIdUser] = useState('');
  const [finish, setFinish] = useState<boolean>(false);

  const handleSendOtp = async () => {
    const sendOtp = await sendRequest<IBackendRes<any>>({
      method: 'GET',
      url: listApi_Nest_Server_API_Route.reSendCodeid(email),
    });
    console.log(sendOtp);

    if (sendOtp.statusCode === 200) {
      setIdUser(sendOtp.data.id);
      stepper.next();
      setFinish(true);
    } else {
      toast.error(`${sendOtp.message}`, {
        position: 'top-right',
        autoClose: 5000,
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

  const handleSendNewPasword = async () => {
    const sendNewPassword = await sendRequest<IBackendRes<any>>({
      method: 'POST',
      url: listApi_Nest_Server_API_Route.newPassword(),
      body: {
        id: idUser,
        password: password,
        codeId: codeId,
      },
    });
    console.log('');
    console.log('');
    console.log('');
    console.log('sendNewPassword', sendNewPassword);
    console.log('');
    console.log('');

    if (sendNewPassword.statusCode === 201) {
      stepper.next();
      setFinish(false);
    } else {
      toast.error(`${sendNewPassword.message}`, {
        position: 'top-right',
        autoClose: 5000,
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

  return !stepper.isLast ? (
    <div className="flex items-center gap-2">
      <Button
        onClick={stepper.prev}
        className={`${stepper.isFirst ? 'hidden' : ''}`}
      >
        Quay Lại
      </Button>

      <Button
        onClick={finish ? handleSendNewPasword : handleSendOtp}
        disabled={email === '' ? true : false}
      >
        Tiếp Theo
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button onClick={stepper.reset}>
        <DialogClose>Hoàn Tất</DialogClose>
      </Button>
    </div>
  );
};
