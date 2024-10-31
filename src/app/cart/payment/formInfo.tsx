'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

import { UseFormReturn } from 'react-hook-form';
//import { formSchema } from '@/app/cart/payment/page';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { ModalAddress } from '@/app/cart/payment/modalAddress';
import { sendRequest } from '@/utils/fetchApi';
import { useAppSelector } from '@/lib/redux/hooks';

interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

interface IAddress {
  _id: string;
  label: string;
}

const formSchema = z.object({
  Email: z.string().min(2, { message: 'Email must be at least 2 characters.' }),
  PhoneNumber: z.string().regex(/^0\d{9}$/, 'Số điện thoại gồm 10 chữ số và bắt đầu bằng số 0'),
  address: z.string().nonempty('Vui lòng chọn địa chỉ nhận hàng'),
});

export function ProfileForm({ form }: ProfileFormProps) {
  const [address, setAddress] = useState<IAddress[]>();
  const [addAddress, setAddAddress] = useState<boolean>(false);

  const { accessToken } = useAppSelector((item: any) => item.account);

  //const address: any[] = [];

  useEffect(() => {
    const getAddress = async () => {
      const address = await sendRequest<IBackendRes<any[]>>({
        url: `http://localhost:3000/api/address`,
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('');
      console.log('');
      console.log('');
      console.log('address  : ', address);
      console.log('');
      console.log('');

      const newAddress: IAddress[] | undefined = address?.data?.map((item) => {
        return { _id: item._id, label: item.address_detail };
      });

      setAddress(newAddress);

      return () => {};
    };
    getAddress();
  }, [accessToken]);

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
                <Input type="email" placeholder="Nhập email của bạn " {...field} />
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
                <Input type="number" placeholder="Nhập PhoneNumber của bạn " {...field} />
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
              {address?.map((item: IAddress) => (
                <FormItem key={item._id} className="flex flex-row address-center justify-start space-y-0 py-1 space-x-3">
                  <FormControl className="">
                    <Checkbox
                      checked={field.value === item.label}
                      onCheckedChange={(checked) => {
                        if (checked) handleAddressChange(item.label);
                        else form.setValue('address', '');
                      }}
                    />
                  </FormControl>
                  <FormLabel className="m-0">{item.label}</FormLabel>
                </FormItem>
              ))}
              <FormMessage />
              <div className="span text-blue-500 text-xs underline cursor-pointer" onClick={() => setAddAddress(true)}>
                Thêm địa chỉ nhận hàng
              </div>
              <ModalAddress open={addAddress} setOpen={setAddAddress}></ModalAddress>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
