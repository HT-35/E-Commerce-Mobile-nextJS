'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: 'email must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'password must be at least 2 characters.',
  }),
});

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Bounce, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ModalForgetPassword from '@/app/auth/login/modalForgetPassword';
import { sendRequest } from '@/utils/fetchApi';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { InitialAccountRedux, setDataAccount } from '@/lib/redux/slices/accountSlice';
import ModalActiveAccountLogin from '@/app/auth/login/ModalActiveAccountLogin';
//import { listApi_Next_Server } from '@/utils/listApi';

import { listApi_Next_Server } from '@/utils/listApi';

export function Login() {
  const searchParams = useSearchParams();
  const searchCallBack = searchParams.get('callback') ?? '';

  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const [idUser, setIdUser] = useState('');
  const [email, setEmail] = useState('');

  const [openActiveAccoutLogin, setOpenActiveAccoutLogin] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { getValues } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values);

    const res: any = await sendRequest<IBackendRes<any>>({
      method: 'POST',
      url: listApi_Next_Server.login(),
      body: { ...values },
    });
    //console.log(`res:`, res);

    if (res?.data?.user) {
      dispatch(setDataAccount(res.data.user));

      toast.success('Đăng nhập thành công', {
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

      if (searchCallBack !== '') {
        router.push(searchCallBack);
      } else {
        router.push('/');
      }

      router.refresh();
    } else if (res?.message?._idUser) {
      const resendOTP = await sendRequest<IBackendRes<any>>({
        method: 'GET',
        url: listApi_Next_Server.reSendOTP(values.email),
      });

      setEmail(values.email);
      setIdUser(res?.message?._idUser);
      setOpenActiveAccoutLogin(true);
    } else {
      toast.error('Tài Khoản Hoặc Mật Khẩu Sai !', {
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
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="group relative  transition-all duration-500">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel
                    className={`absolute  text-black  text-xl top-0 left-0 transform translate-y-4 scale-75 origin-top-left transition-transform duration-300 ease-in-out group-hover:-translate-y-5 group-focus:scale-75 z-0
                    ${getValues('email').length > 0 ? '-translate-y-5 rounded-lg' : ''}
                    `}
                  >
                    Email
                  </FormLabel>
                  <FormControl className="relative z-10 ">
                    <Input
                      className="relative  placeholder:text-black   p-0 bg-white z-10 border-0 border-b-2 rounded-none shadow-none
                    focus:border-0
                    focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-red-500
                     group-hover:border-red-500
                     group-hover:placeholder-transparent 
                    "
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <div className="group relative  transition-all duration-500">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel
                      className={`absolute text-black  text-xl top-0 left-0 transform translate-y-4 scale-75 origin-top-left transition-transform duration-300 ease-in-out group-hover:-translate-y-5 group-focus:scale-75 z-0
                    ${getValues('password').length > 0 ? '-translate-y-5 rounded-lg' : ''}
                    `}
                    >
                      Mật Khẩu
                    </FormLabel>

                    <FormControl className="relative z-10 ">
                      <Input
                        type={openPassword ? 'text' : 'password'}
                        className="relative  p-0  placeholder:text-black   bg-white z-10 border-0 border-b-2 rounded-none shadow-none
                    focus:border-0
                    focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-red-500
                     group-hover:border-red-500
                     group-hover:placeholder-transparent 
                    "
                        style={{
                          paddingRight: '50px',
                        }}
                        placeholder="Mật Khẩu"
                        {...field}
                      />
                    </FormControl>

                    <div className="absolute top-1/2 right-3 z-20 -translate-y-[50%] cursor-pointer">
                      {getValues('password')?.length > 0 &&
                        (openPassword ? (
                          <EyeNoneIcon width={25} height={25} onClick={() => setOpenPassword((prev) => !prev)} />
                        ) : (
                          <EyeOpenIcon width={25} height={25} onClick={() => setOpenPassword((prev) => !prev)} />
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="forgetPassword text-xs my-2  text-slate-400 cursor-pointer select-none">
              <ModalForgetPassword> Quên mật khẩu ?</ModalForgetPassword>
            </div>{' '}
          </div>

          <Button type="submit" className="w-full bg-red-500 select-none">
            Đăng Nhập
          </Button>
        </form>
      </Form>
      <ModalActiveAccountLogin
        openActiveAccoutLogin={openActiveAccoutLogin}
        setOpenActiveAccoutLogin={setOpenActiveAccoutLogin}
        idUser={idUser}
        email={email}
      ></ModalActiveAccountLogin>
    </div>
  );
}

export default Login;
