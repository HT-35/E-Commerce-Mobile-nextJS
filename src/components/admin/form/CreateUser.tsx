'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
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
import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';

const listFieldSchema = [
  {
    name: 'name',
    title: 'Tên Người Dùng',
    message: 'Tên người dùng phải từ 3 kí tự trở lên',
  },

  //{
  //  name: 'roles',
  //  title: 'Quyền',
  //  message: 'Quyền phải là admin hoặc employee',
  //},
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
  roles: z.string({ required_error: 'Bắt buộc phải nhập email' }),
  phone: z
    .string({ message: 'Bắt buộc phải nhập số điện thoại' })
    .refine((val) => /^\d{10}$/.test(val), {
      message: 'Số điện thoại phải là 10 chữ số',
    }),
  image: z.instanceof(File, { message: 'Vui lòng thêm hình ảnh' }),
});

const defaultValues = {
  ...listFieldSchema.reduce(
    (acc, item) => {
      acc[item.name] = '';
      return acc;
    },
    {} as Record<string, string>
  ),
  roles: '',
  phone: '',
  image: (undefined as unknown as File) || '',
};

export default function FormCreateUser() {
  const { name, _id, accessToken, email } = useAppSelector((item) => item.account);
  const [fileImg, setFileImg] = useState<any>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deleteImg = () => {
    setFileImg(undefined as unknown as File);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { control, handleSubmit, register } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form submitted:', data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('roles', data.roles);
    formData.append('file', fileImg);

    // Use sendRequest to send data to the API
    sendRequest({
      url: 'localhost:3000/api/user',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((response) => {
        // Handle success (e.g., show success message, update the user list, etc.)
        console.log('User added successfully:', response);
      })
      .catch((error) => {
        // Handle error (e.g., show error message)
        console.error('Error adding user:', error);
      });
  }

  function onError(errors: any) {
    console.log('Form errors:', errors);
  }

  return (
    <Form {...form}>
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
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quyền</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn Quyền" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="employee">employee</SelectItem>
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
            name="phone"
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

          <FormField
            control={form.control}
            name={'image'}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Hình Ảnh</FormLabel>
                  <FormControl>
                    <Input
                      name={'image'}
                      className="w-full"
                      type="file"
                      placeholder={'Thêm Hình Ảnh'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFileImg(file);
                          field.onChange(file);
                        }
                      }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      ref={fileInputRef}
                    />
                  </FormControl>

                  <FormMessage />

                  {fileImg && (
                    <div className="relative">
                      <Image
                        src={URL.createObjectURL(fileImg)}
                        //width={150}
                        //height={150}
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: '150px', height: 'auto' }}
                        alt="Picture of the author"
                      />
                      <Button
                        type="button"
                        onClick={deleteImg}
                        className="rounded-full top-0 left-0 absolute  "
                      >
                        x
                      </Button>
                    </div>
                  )}
                </FormItem>
              );
            }}
          />
        </div>
        <Button type="submit" className="xl:mt-20 mt-8 w-full bg-green-400">
          Tạo Tài Khoản
        </Button>
      </form>
    </Form>
  );
}
