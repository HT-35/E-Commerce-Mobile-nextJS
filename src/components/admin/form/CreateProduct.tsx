'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendRequest, sendRequestFile } from '@/utils/fetchApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { useState } from 'react';

const listProduct = [
  {
    name: 'name',
    testData: 'Điện thoại realme C67 8GB/128GB',
    title: 'Tên Sản Phẩm',
    message: 'Tên Sản Phẩm phải từ 3 kí tự trở lên',
  },
  {
    name: 'screen',
    testData: '6.72" - Tần số quét 90 Hz',
    title: 'Màn Hình',
    message: 'Màn Hình phải từ 6 kí tự trở lên',
  },
  {
    name: 'amount',
    testData: '100',
    message: 'Số Lượng phải từ 1 kí tự trở lên',
    title: 'Số Lượng',
  },
  {
    name: 'os',
    testData: 'android',
    message: 'Hệ Điều Hành phải từ 3 kí tự trở lên',
    title: 'Hệ Điều Hành',
  },
  {
    name: 'brand',
    testData: 'SamSung',
    message: 'Hãng điện thoại phải từ 3 kí tự trở lên',
    title: 'Hãng điện thoại',
  },
  { name: 'ram', testData: '8GB', message: 'RAM phải từ 1 kí tự trở lên', title: 'RAM' },
  { name: 'rom', testData: '128GB', message: 'ROM phải từ 6 kí tự trở lên', title: 'ROM' },
  { name: 'battery', testData: '5000mAh', message: 'Pin phải từ 3 kí tự trở lên', title: 'Pin' },
  {
    name: 'cameraBefore',
    testData: '12 MP',
    message: 'Camera phải từ 2 kí tự trở lên',
    title: 'Camera Trước',
  },
  {
    name: 'cameraAfter',
    testData: 'Chính 108 MP',
    message: 'Camera phải từ 2 kí tự trở lên',
    title: 'Camera Sau',
  },
  {
    name: 'special',
    testData: 'special',
    message: 'Thông Số Đặc Biệt phải từ 6 kí tự trở lên',
    title: 'Thông Số Đặc Biệt',
  },
  {
    name: 'design',
    testData: 'Good',
    message: 'Thiết Kế phải từ 6 kí tự trở lên',
    title: 'Thiết Kế',
  },
];

const FormSchema: any = z.object({
  ...listProduct.reduce(
    (acc, item) => {
      acc[item.name] = z.string().min(1, {
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
      acc[item.name] = item.testData;
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

export function FormCreateProduct() {
  const [filesImgage, setFileImage] = useState<any>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const { accessToken } = useAppSelector((item) => item.account);

  const { control, handleSubmit, register } = form;
  const {
    fields: optionFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'option',
  });

  async function onSubmit(newData: z.infer<typeof FormSchema>) {
    //console.log('Form submitted:', data);

    const data = {
      ...newData,
      amount: Number(newData.amount),
    };

    try {
      // Xử lý tuần tự upload ảnh
      for (const [index, item] of data.option.entries()) {
        const img = item.img[0].imgItem;
        const fileArray: File[] = Array.from(img);
        const formData = new FormData();

        // Thêm các tệp vào FormData
        fileArray.forEach((file: File) => {
          formData.append('files', file);
        });

        // Chờ upload ảnh
        const sendImg = await sendRequestFile<IBackendRes<any>>({
          method: 'POST',
          url: `localhost:3000/api/product/img`,
          body: formData,
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log('Image uploaded:', sendImg);

        const arrImg = await sendImg.data.map((item: any) =>
          Object.create(null, {
            link: { value: item.link, enumerable: true },
            cloudinary_id: { value: item.cloudinary_id, enumerable: true },
          })
        );

        data.option[index].img = arrImg; // Cập nhật dữ liệu ảnh trong form
      }

      // Gửi yêu cầu tạo sản phẩm sau khi xử lý xong ảnh
      const createProduct = await sendRequest<IBackendRes<any>>({
        method: 'POST',
        url: `localhost:3000/api/product`,
        body: { ...data },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('Product created:', createProduct);
    } catch (error) {
      console.error('Error uploading images or creating product:', error);
    }
  }

  function onError(errors: any) {
    console.log('Form errors:', errors);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5">
          {listProduct.map((item, index) => {
            //const typeNumber = ['price', 'amount', 'ram', 'rom', 'battery'];
            const typeNumber = ['price'];
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
                        {...register(`option.${index}.img.0.imgItem` as const)}
                        onChange={(e) => {
                          const files = e.target.files; // Lấy file từ e.target.files
                          if (files) {
                            setFileImage((prv: any) => [...prv, files]);
                            const fileArray = Array.from(files); // Chuyển file list thành mảng

                            field.onChange(fileArray); // Truyền mảng file vào field.onChange để lưu trữ trong form
                          }
                        }}
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
