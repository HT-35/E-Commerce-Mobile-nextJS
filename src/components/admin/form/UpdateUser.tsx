'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sendRequest } from '@/utils/fetchApi';
import { listApi } from '@/utils/listApi';
import { useAppSelector } from '@/lib/redux/hooks';

import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const listFieldSchema = [
  {
    name: 'name',
    title: 'Họ và Tên',
    message: 'Tên người dùng phải từ 3 kí tự trở lên',
  },
];

const FormSchema = z.object({
  ...listFieldSchema.reduce(
    (acc, item) => {
      acc[item.name] = z.string().min(2, {
        message: `${item.message}`,
      });
      return acc;
    },
    {} as Record<string, z.ZodString>
  ),
  email: z
    .string({ message: 'Bắt buộc phải nhập email' })
    .email('Phải nhập đúng định dạng email')
    .min(5),
  role: z.string({ required_error: 'Bắt buộc phải nhập role' }),
  numberPhone: z
    .string({ message: 'Bắt buộc phải nhập số điện thoại' })
    .refine((val) => /^\d{10}$/.test(val), {
      message: 'Số điện thoại phải là 10 chữ số',
    }),
  //image: z.instanceof(File, { message: 'Vui lòng thêm hình ảnh' }),
});

export default function UpdateUser({
  setActiveFormUpdate,
  data,
}: {
  setActiveFormUpdate: any;
  data: any;
}) {
  const router = useRouter();

  const { _id, name, role, email, numberPhone } = data;
  console.log(`_id:`, _id);
  const { accessToken } = useAppSelector((item) => item.account);

  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues = {
    name: data?.name || '',
    email: data?.email || '',
    role: data?.role || '',
    numberPhone: data?.numberPhone || '',
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    const createAccount = await sendRequest<IBackendRes<any>>({
      method: `PATCH`,
      url: listApi.updateUser(_id),
      headers: { Authorization: `Bearer ${accessToken}` },
      body: { ...data },
    });

    console.log('');
    console.log('');
    console.log('createAccount   :   ', createAccount);
    console.log('');
    console.log('');
    console.log('');

    if (createAccount.statusCode === 200) {
      setLoading(false);
      setActiveFormUpdate(false);
      toast.success('Cập nhật tài khoản thành công!', {
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
      //window.location.reload();

      router.refresh();
    } else {
      setLoading(false);
      //setActiveFormUpdate(false);
      toast.error(`${createAccount.message}`, {
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

  function onError(errors: any) {
    console.log('Form errors:', errors);
  }

  return (
    <Form {...form}>
      <h1 className="text-center text-2xl">Sửa Khoản Nhân Viên</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full ">
        <div className="grid grid-cols-1 max-xl:grid-cols-1 max-lg:grid-cols-1 gap-5">
          {listFieldSchema.map((item, index) => {
            return (
              <div
                key={index}
                className="group relative transition-all duration-500"
              >
                <FormField
                  control={control}
                  name={item.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.title}</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          className="p-0 border-0 border-b-2 rounded-none shadow-none focus:border-0 focus-visible:ring-0 focus-visible:border-b-2 group-hover:border-red-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quyền</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn Quyền" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="user">user</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    className="p-0 border-0 border-b-2 rounded-none shadow-none focus:border-0 focus-visible:ring-0 focus-visible:border-b-2 group-hover:border-red-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="numberPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Điện Thoại</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    autoComplete="off"
                    className="p-0 border-0 border-b-2 rounded-none shadow-none focus:border-0 focus-visible:ring-0 focus-visible:border-b-2 group-hover:border-red-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="xl:mt-20 mt-8 w-full bg-green-400 text-black font-semibold text-xl hover:bg-green-500"
        >
          Tạo Tài Khoản
          <div
            className={`${loading ? '' : 'hidden'}  w-7 h-7 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin`}
          ></div>
        </Button>
      </form>
    </Form>
  );
}
