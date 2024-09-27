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
  { name: 'type', message: 'Hãng phải từ 2 kí tự trở lên', title: 'Hãng' },
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
    name: 'camera',
    message: 'Camera phải từ 2 kí tự trở lên',
    title: 'Camera',
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

export function FormCreateProduct() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { control, handleSubmit, register } = form;
  const {
    fields: optionFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'option',
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form submitted:', data);
    console.log(
      'File upload:',
      data.option.map((opt) => opt.img)
    );
  }

  function onError(errors: any) {
    console.log('Form errors:', errors);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5">
          {listProduct.map((item, index) => {
            const typeNumber = ['price', 'amount', 'ram', 'rom', 'battery'];
            const typeInput = typeNumber.includes(item.name)
              ? 'number'
              : 'text';
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
            <div
              key={option.id}
              className="col-span-3  xl:flex xl:justify-between xl:items-center"
            >
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

              <Button
                type="button"
                onClick={() => remove(index)}
                className="max-xl:w-full mt-2"
              >
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
