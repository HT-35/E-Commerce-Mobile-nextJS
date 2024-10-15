'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';

interface FormEditUserProps {
  userId: string;
}

const listFieldSchema = [
  {
    name: 'name',
    title: 'Tên Người Dùng',
    message: 'Tên người dùng phải từ 3 kí tự trở lên',
  },

  //{
  //  name: 'role',
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
  email: z.string({ message: 'Bắt buộc phải nhập email' }).email('Phải nhập đúng định dạng email').min(5),
  role: z.string({ required_error: 'Bắt buộc phải nhập email' }),
  phoneNumber: z.string({ message: 'Bắt buộc phải nhập số điện thoại' }).refine((val) => /^\d{10}$/.test(val), {
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
  role: '',
  phoneNumber: '',
  image: (undefined as unknown as File) || '',
};

export default function FormCreateUser({ userId }: FormEditUserProps) {
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

  const { control, handleSubmit, register, setValue } = form;

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     console.log('Form submitted:', data);

//     const formData = new FormData();
//     formData.append('file', fileImg);
//   }

  function onError(errors: any) {
    console.log('Form errors:', errors);
  }

  const { name, _id, accessToken, email } = useAppSelector((item) => item.account);
  const [userList, setUserList] = useState([]);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      const res = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:3000/api/user/${userId}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = res.data;

      // Set form values based on fetched user data
      setValue('name', userData.name);
      setValue('email', userData.email);
      setValue('role', userData.roles);
      setValue('phoneNumber', userData.phone);
      if (userData.image) setFileImg(userData.image);
    };

    fetchUser();
  }, [userId, accessToken, setValue]);

  console.log(userList);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Prepare form data for submission
      const formData = {
        ...data,
        image: fileImg, // Include image if it's updated
      };

      // Send PATCH request to update the user data
      const res = await sendRequest({
        url: `http://localhost:3000/api/user?id=${userId}`,
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.success) {
        alert('Cập nhật tài khoản thành công!');
        // You can refresh the user list or close the modal here
      } else {
        console.error('Update failed:', res.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full ">
        <div className="grid grid-cols-1 max-xl:grid-cols-1 max-lg:grid-cols-1 gap-5">
          {listFieldSchema.map((item, index) => {
            return (
              <div key={index} className="group relative transition-all duration-500">
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
            control={control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quyền</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            name="phoneNumber"
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
                      <Button type="button" onClick={deleteImg} className="rounded-full top-0 left-0 absolute  ">
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
          Sửa Tài Khoản
        </Button>
      </form>
    </Form>
  );
}
