'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { number, z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendRequest, sendRequestFile } from '@/utils/fetchApi';
import { useAppSelector } from '@/lib/redux/hooks';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Bounce, toast } from 'react-toastify';
import { listApi_Next_Server } from '@/utils/listApi';

export function FormUpdateProduct({ data, setActiveFormUpdate }: { data: any; setActiveFormUpdate: any }) {
  const slug = data?.slug;

  console.log(data);

  const listProduct = [
    {
      name: 'name',
      defaulData: data?.name || '',
      title: 'Tên Sản Phẩm',
      message: 'Tên Sản Phẩm phải từ 3 kí tự trở lên',
    },
    {
      name: 'screen',
      defaulData: data?.screen || '',
      title: 'Màn Hình',
      message: 'Màn Hình phải từ 6 kí tự trở lên',
    },
    {
      name: 'chip',
      defaulData: data?.chip || '',
      message: 'chip 3 kí tự trở lên',
      title: 'Chip Xử Lý',
    },
    {
      name: 'sim',
      defaulData: data?.sim || '',
      message: 'sim 2 kí tự trở lên',
      title: 'Sim',
    },

    {
      name: 'os',
      defaulData: data?.os || '',
      message: 'Hệ Điều Hành phải từ 3 kí tự trở lên',
      title: 'Hệ Điều Hành',
    },
    {
      name: 'brand',
      defaulData: data?.brand || '',
      message: 'Hãng điện thoại phải từ 3 kí tự trở lên',
      title: 'Hãng điện thoại',
    },
    {
      name: 'ram',
      defaulData: data?.ram || '',
      message: 'RAM phải từ 1 kí tự trở lên',
      title: 'RAM',
    },
    {
      name: 'rom',
      defaulData: data?.rom || '',
      message: 'ROM phải từ 6 kí tự trở lên',
      title: 'ROM',
    },
    {
      name: 'battery',
      defaulData: data?.battery || '',
      message: 'Pin phải từ 3 kí tự trở lên',
      title: 'Pin',
    },
    {
      name: 'cameraBefore',
      defaulData: data?.cameraBefore || '',
      message: 'Camera phải từ 2 kí tự trở lên',
      title: 'Camera Trước',
    },
    {
      name: 'cameraAfter',
      defaulData: data?.cameraAfter || '',
      message: 'Camera phải từ 2 kí tự trở lên',
      title: 'Camera Sau',
    },
    {
      name: 'special',
      defaulData: data?.special || '',
      message: 'Thông Số Đặc Biệt phải từ 6 kí tự trở lên',
      title: 'Thông Số Đặc Biệt',
    },
  ];

  const FormSchema: any = z.object({
    ...listProduct.reduce(
      (acc, data) => {
        acc[data.name] = z.string().min(1, {
          message: `${data.message}`,
        });
        return acc;
      },
      {} as Record<string, z.ZodString>
    ),
    amount: z.any(),
  });

  const defaultValues = {
    ...listProduct.reduce(
      (acc, data) => {
        acc[data.name] = data.defaulData;
        return acc;
      },
      {} as Record<string, string>
    ),
    amount: data?.amount || '',
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const { accessToken } = useAppSelector((data) => data.account);

  const { control, handleSubmit } = form;

  async function onSubmit(newData: z.infer<typeof FormSchema>) {
    try {
      const data = {
        ...newData,
        amount: Number(newData.amount),
      };
      const createProduct = await sendRequest<IBackendRes<any>>({
        method: 'PATCH',
        url: listApi_Next_Server.updateProduct(slug),
        body: { ...data },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('Product created:', createProduct);
      if ((createProduct.statusCode = 200)) {
        setActiveFormUpdate(false);
        toast.success(`Cập Nhật Sản Phẩm ${newData?.name} Thành Công !`, {
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
      } else {
        //setActiveFormUpdate(false);
        toast.error(`Cập Nhật Sản Phẩm ${newData?.name} Không Thành Công !`, {
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
    } catch (error) {
      console.error('Error uploading images or creating product:', error);
    }
  }

  function onError(errors: any) {
    console.log('Form errors:', errors);
  }

  return (
    <Form {...form}>
      <h1 className="text-3xl text-center font-semibold">Sửa Sản Phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5">
          {listProduct?.length > 0 &&
            listProduct?.map((data, index) => {
              //const typeNumber = ['price', 'amount', 'ram', 'rom', 'battery'];
              const typeNumber = ['price'];
              const typeInput = typeNumber?.includes(data?.name) ? 'number' : 'text';
              return (
                <div key={index} className="group relative transition-all duration-500">
                  <FormField
                    control={control}
                    name={data?.name as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{data?.title}</FormLabel>
                        <FormControl>
                          <Input
                            type={typeInput}
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
            name={'amount'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Lượng</FormLabel>
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

        <Button type="submit" className="xl:mt-20 mt-8 w-full bg-green-400">
          Submit
        </Button>
      </form>
    </Form>
  );
}
