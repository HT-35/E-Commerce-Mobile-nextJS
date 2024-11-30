'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string({
      message: 'Vui Lòng Nhập Họ Và Tên',
    })
    .min(2, {
      message: 'Tên Phải Từ 2 Kí Tự Trở Lên ',
    }),
  email: z
    .string({
      message: 'Vui Lòng Nhập Email',
    })
    .email({
      message: 'Vui Lòng Nhập Email',
    })
    .min(2, {
      message: 'Vui Lòng Nhập Email',
    }),
  password: z.string().min(2, {
    message: 'Mật Khẩu Phải Từ 2 Kí Tự Trở Lên.',
  }),
  reEnterPassword: z.string().min(2, {
    message: 'Mật Khẩu Phải Từ 2 Kí Tự Trở Lên.',
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
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import ModalActiveAccount from '@/app/auth/register/modalActive';

export function Register() {
  const [activeAccount, setActiveAccount] = useState<boolean>(false);

  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const [disableBtn, SetDisableBtn] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      reEnterPassword: '',
    },
  });

  const { getValues } = form;

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    if (values.password !== values.reEnterPassword) {
      SetDisableBtn(true);
      return toast.error('Nhập Lại Mật Khẩu Không Khớp !', {
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
    //toast.success('Register Successfull!', {
    //  position: 'top-right',
    //  autoClose: 5000,
    //  hideProgressBar: false,
    //  closeOnClick: true,
    //  pauseOnHover: true,
    //  draggable: true,
    //  progress: undefined,
    //  theme: 'light',
    //  transition: Bounce,
    //});
    setActiveAccount(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="group relative  transition-all duration-500">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel
                  className={`absolute  text-black text-xl top-0 left-0 transform translate-y-4 scale-75 origin-top-left transition-transform duration-300 ease-in-out group-hover:-translate-y-5 group-focus:scale-75 z-0
                    ${getValues('name')?.length > 0 ? '-translate-y-5 rounded-lg' : ''}
                    `}
                >
                  Họ Và Tên
                </FormLabel>
                <FormControl className="relative z-10 ">
                  <Input
                    className="relative p-0  placeholder:text-black  bg-white z-10 border-0 border-b-2 rounded-none shadow-none
                    focus:border-0
                    focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-red-500
                     group-hover:border-red-500
                     group-hover:placeholder-transparent 
                    "
                    autoComplete="name"
                    placeholder="Họ Và Tên"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="group relative  transition-all duration-500">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel
                  className={`absolute  text-black text-xl top-0 left-0 transform translate-y-4 scale-75 origin-top-left transition-transform duration-300 ease-in-out group-hover:-translate-y-5 group-focus:scale-75 z-0
                    ${getValues('email')?.length > 0 ? '-translate-y-5 rounded-lg' : ''}
                    `}
                >
                  Email
                </FormLabel>
                <FormControl className="relative z-10 ">
                  <Input
                    className="relative p-0  placeholder:text-black  bg-white z-10 border-0 border-b-2 rounded-none shadow-none
                    focus:border-0
                    focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-red-500
                     group-hover:border-red-500
                     group-hover:placeholder-transparent 
                    "
                    autoComplete="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="group relative  transition-all duration-500">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const { onChange, ...props } = field;
              return (
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
                      className="relative pr-40 placeholder:text-black  p-0 bg-white z-10 border-0 border-b-2 rounded-none shadow-none
                    focus:border-0
                    focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-red-500
                     group-hover:border-red-500
                     group-hover:placeholder-transparent 
                    "
                      style={{
                        paddingRight: '50px',
                      }}
                      placeholder="Mật Khẩu"
                      onChange={(e) => {
                        SetDisableBtn(false);
                        onChange(e);
                      }}
                      {...props}
                    />
                  </FormControl>

                  <div className="absolute top-0 right-1 z-20">
                    {getValues('password')?.length > 0 &&
                      (openPassword ? (
                        <EyeNoneIcon width={25} height={25} onClick={() => setOpenPassword((prev: boolean) => !prev)} />
                      ) : (
                        <EyeOpenIcon width={25} height={25} onClick={() => setOpenPassword((prev: boolean) => !prev)} />
                      ))}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="group relative  transition-all duration-500">
          <FormField
            control={form.control}
            name="reEnterPassword"
            render={({ field }) => {
              const { onChange, ...props } = field;
              return (
                <FormItem className="relative">
                  <FormLabel
                    className={`absolute text-black  text-xl top-0 left-0 transform translate-y-4 scale-75 origin-top-left transition-transform duration-300 ease-in-out group-hover:-translate-y-5 group-focus:scale-75 z-0
                    ${getValues('reEnterPassword')?.length > 0 ? '-translate-y-5 rounded-lg' : ''}
                    `}
                  >
                    Nhập Lại Mật Khẩu
                  </FormLabel>
                  <FormControl className="relative z-10 ">
                    <Input
                      type={openPassword ? 'text' : 'password'}
                      className="relative pr-40 placeholder:text-black  p-0 bg-white z-10 border-0 border-b-2 rounded-none shadow-none
                    focus:border-0
                    focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-red-500
                     group-hover:border-red-500
                     group-hover:placeholder-transparent 
                    "
                      style={{
                        paddingRight: '50px',
                      }}
                      placeholder="Nhập Lại Mật Khẩu"
                      onChange={(e) => {
                        SetDisableBtn(false);
                        onChange(e);
                      }}
                      {...props}
                    />
                  </FormControl>

                  <div className="absolute top-0 right-1 z-20">
                    {getValues('reEnterPassword')?.length > 0 &&
                      (openPassword ? (
                        <EyeNoneIcon width={25} height={25} onClick={() => setOpenPassword((prev: boolean) => !prev)} />
                      ) : (
                        <EyeOpenIcon width={25} height={25} onClick={() => setOpenPassword((prev: boolean) => !prev)} />
                      ))}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <Button type="submit" disabled={disableBtn} className="w-full bg-red-500">
          Đăng Ký
        </Button>
      </form>
      <ModalActiveAccount open={activeAccount} setOpen={setActiveAccount} />
    </Form>
  );
}

export default Register;
