'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Bounce, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ModalForgetPassword from '@/app/auth/login/modalForgetPassword';
import { sendRequest } from '@/utils/fetchApi';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  InitialAccountRedux,
  setDataAccount,
} from '@/lib/redux/slices/accountSlice';

export function Login() {
  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const dataAccount = useAppSelector((state: any) => state.account);

  useEffect(() => {
    console.log(' >>> redux :', dataAccount);
  }, [dataAccount]);

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

    const res: any = await sendRequest<IBackendRes<IUser>>({
      method: 'POST',
      url: 'localhost:3000/api/auth/login',
      body: { ...values },
    });

    console.log(res);

    dispatch(setDataAccount(res.data.user));

    toast.success('Login Successfull!', {
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

  return (
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
                    placeholder=" Email"
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
                      className="relative  p-0 placeholder:text-black   bg-white z-10 border-0 border-b-2 rounded-none shadow-none
                    focus:border-0
                    focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-red-500
                     group-hover:border-red-500
                     group-hover:placeholder-transparent 
                    "
                      style={{
                        paddingRight: '50px',
                      }}
                      placeholder="  Mật Khẩu"
                      {...field}
                    />
                  </FormControl>

                  <div className="absolute top-0 right-1 z-20">
                    {getValues('password')?.length > 0 &&
                      (openPassword ? (
                        <EyeNoneIcon
                          width={25}
                          height={25}
                          onClick={() => setOpenPassword((prev) => !prev)}
                        />
                      ) : (
                        <EyeOpenIcon
                          width={25}
                          height={25}
                          onClick={() => setOpenPassword((prev) => !prev)}
                        />
                      ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="forgetPassword text-xs my-2  text-slate-400 cursor-pointer">
            <ModalForgetPassword> Quên mật khẩu ?</ModalForgetPassword>
          </div>{' '}
        </div>

        <Button type="submit" className="w-full bg-red-500">
          Đăng Nhập
        </Button>
      </form>
    </Form>
  );
}

export default Login;
