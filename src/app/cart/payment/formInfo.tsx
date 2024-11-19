'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

import { UseFormReturn } from 'react-hook-form';
import { formSchema } from '@/app/cart/payment/page';
import { z } from 'zod';

interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function ProfileForm({ form }: ProfileFormProps) {
  const items = [
    {
      id: '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Hồ Chí Minh',
      label: '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Hồ Chí Minh',
    },
    {
      id: '268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh',
      label: '268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh',
    },
  ];

  function handleAddressChange(selectedId: string) {
    form.setValue('address', selectedId);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Nhập email của bạn !"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="PhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số Điện Thoại</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Nhập PhoneNumber của bạn !"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa Chỉ Nhận Hàng</FormLabel>
              {items.map((item) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-center justify-start space-y-0 py-1 space-x-3"
                >
                  <FormControl className="">
                    <Checkbox
                      checked={field.value === item.id}
                      onCheckedChange={(checked) => {
                        if (checked) handleAddressChange(item.id);
                        else form.setValue('address', '');
                      }}
                    />
                  </FormControl>
                  <FormLabel className="m-0">{item.label}</FormLabel>
                </FormItem>
              ))}
              <FormMessage />
              <div className="span text-blue-500 text-xs underline cursor-pointer">
                Thêm địa chỉ nhận hàng
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
