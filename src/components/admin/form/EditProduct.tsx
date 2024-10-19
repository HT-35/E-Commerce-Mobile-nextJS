'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/redux/hooks';
import { sendRequest } from '@/utils/fetchApi';

interface FormEditProductProps {
  productId: string;
}

const listProduct = [
  {
    name: 'name',
    title: 'Tên Sản Phẩm',
    message: 'Tên Sản Phẩm phải từ 3 kí tự trở lên',
  },
  {
    name: 'price',
    title: 'Giá',
    message: 'Giá phải từ 6 kí tự trở lên',
  },
  {
    name: 'screen',
    title: 'Màn Hình',
    message: 'Màn Hình phải từ 6 kí tự trở lên',
  },
  { name: 'brand', message: 'Hãng phải từ 2 kí tự trở lên', title: 'Hãng' },
  {
    name: 'amount',
    message: 'Số Lượng phải từ 1 kí tự trở lên',
    title: 'Số Lượng',
  },
  {
    name: 'os',
    message: 'Hệ Điều Hành phải từ 3 kí tự trở lên',
    title: 'Hệ Điều Hành',
  },
  { name: 'ram', message: 'RAM phải từ 1 kí tự trở lên', title: 'RAM' },
  { name: 'rom', message: 'ROM phải từ 6 kí tự trở lên', title: 'ROM' },
  { name: 'battery', message: 'Pin phải từ 3 kí tự trở lên', title: 'Pin' },
  {
    name: 'cameraBefore',
    message: 'Camera Trước phải từ 2 kí tự trở lên',
    title: 'Camera Trước',
  },
  {
    name: 'cameraAfter',
    message: 'Camera Sau phải từ 2 kí tự trở lên',
    title: 'Camera Sau',
  },
  {
    name: 'special',
    message: 'Thông Số Đặc Biệt phải từ 6 kí tự trở lên',
    title: 'Thông Số Đặc Biệt',
  },
  {
    name: 'design',
    message: 'Thiết Kế phải từ 6 kí tự trở lên',
    title: 'Thiết Kế',
  },
];

const FormSchema = z.object({
  ...listProduct.reduce(
    (acc, item) => {
      acc[item.name] = z.string().min(2, {
        message: `${item.message}`,
      });
      return acc;
    },
    {} as Record<string, z.ZodString>
  ),
  option: z.array(
    z.object({
      color: z.string().min(1, 'Màu là bắt buộc'),
      price: z.string().min(1, 'Giá là bắt buộc'),
      img: z.array(
        z.object({
          imgItem: z.any(),
        })
      ),
    })
  ),
});

const defaultValues = {
  ...listProduct.reduce(
    (acc, item) => {
      acc[item.name] = '';
      return acc;
    },
    {} as Record<string, string>
  ),
  option: [
    {
      color: '',
      price: '',
      img: [{ imgItem: undefined }],
    },
  ],
};

export function FormEditProduct({ productId }: FormEditProductProps) {
  const { accessToken } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { control, handleSubmit, setValue } = form;
  const { fields: optionFields, append, remove } = useFieldArray({
    control,
    name: 'option',
  });

  // Fetch product data by slug
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setLoading(true);
      try {
        const res = await sendRequest<IBackendRes<any>>({
          url: `http://localhost:3000/api/product/${productId}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const productData = res.data;

        // Set form values based on fetched product data
        setValue('name', productData.name);
        setValue('price', productData.option[0].price);
        setValue('screen', productData.screen);
        setValue('brand', productData.brand);
        setValue('amount', productData.amount);
        setValue('os', productData.os);
        setValue('ram', productData.ram);
        setValue('rom', productData.rom);
        setValue('battery', productData.battery);
        setValue('cameraBefore', productData.cameraBefore);
        setValue('cameraAfter', productData.cameraAfter);
        setValue('special', productData.special);
        // Add more setValue for other fields as needed

        if (productData.option && productData.option.length) {
          productData.option.forEach((option: any, index: number) => {
            setValue(`option.${index}.color`, option.color);
            setValue(`option.${index}.price`, option.price);
            setValue(`option.${index}.img`, option.img);
          });
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, accessToken, setValue]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data);
    // Call your API to update the product here
  };

  const onError = (errors: any) => {
    console.log('Form errors:', errors);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5">
          {listProduct.map((item, index) => {
            const typeNumber = ['price', 'amount'];
            const typeInput = typeNumber.includes(item.name) ? 'number' : 'text';
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
        </div>

        {/* Input cho option (bao gồm color, price và img upload) */}
        <div className="col-span-3 grid">
          <h3>Options</h3>
          {optionFields.map((option, index) => (
            <div key={option.id} className="col-span-3  xl:flex xl:justify-between xl:items-center">
              <FormField
                control={control}
                name={`option.${index}.color`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Màu sắc</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`option.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`option.${index}.img.0.imgItem`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="button" onClick={() => remove(index)} className="max-xl:w-full mt-2">
                Xóa Option
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                color: '',
                price: '',
                img: [{ imgItem: undefined }],
              })
            }
            className="mt-4"
          >
            Thêm Option
          </Button>
        </div>

        <Button type="submit" className="xl:mt-20 mt-8 w-full bg-green-400">
          Cập Nhật Sản Phẩm
        </Button>
      </form>
    </Form>
  );
}
