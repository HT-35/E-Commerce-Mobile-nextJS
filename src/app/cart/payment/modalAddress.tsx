'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/components/hooks/use-toast';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/fetchApi';
import { env } from '@/utils/listENV';
import { useAppSelector } from '@/lib/redux/hooks';

const NEXT_PUBLIC_KEY_GHN_DEV = env.NEXT_PUBLIC_KEY_GHN_DEV();

export function ModalAddress({ open, setOpen }: { open?: boolean; setOpen?: any }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thêm địa chỉ giao hàng</AlertDialogTitle>
        </AlertDialogHeader>
        <AddressForm setOpen={setOpen} />

        <AlertDialogFooter className="w-full">
          <AlertDialogAction onClick={() => setOpen(false)}>Đóng</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const FormSchema = z.object({
  address_detail: z.string().min(2, {
    message: 'address_detail  must be at least 2 characters.',
  }),
  province_id: z.string().min(2, {
    message: 'Chọn tỉnh phố bạn muốn giao hàng tới',
  }),
  district_id: z.string().min(2, {
    message: 'Chọn huyện hoặc thành phố bạn muốn giao hàng tới',
  }),
  ward_code: z.string().min(2, {
    message: 'Chọn xã hoặc phường  bạn muốn giao hàng tới',
  }),
});

export function AddressForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { accessToken } = useAppSelector((item) => item.account);

  const [province, setProvince] = useState<
    {
      ProvinceID: Number;
      ProvinceName: String;
    }[]
  >([]);

  const [district, setDistrict] = useState<
    {
      DistrictID: Number;
      DistrictName: String;
    }[]
  >([]);

  const [ward, setWard] = useState<
    {
      WardID: Number;
      WardName: String;
    }[]
  >([]);

  //getProvince
  useEffect(() => {
    const getProvince = async () => {
      const province: {
        code: number;
        data: [any];
      } = await sendRequest({
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
        method: 'GET',
        headers: { Token: NEXT_PUBLIC_KEY_GHN_DEV },
      });

      if (province.data.length > 0) {
        const newProvince = province.data.map((item: any) => {
          return {
            ProvinceName: item.ProvinceName,
            ProvinceID: item.ProvinceID,
          };
        });
        setProvince(newProvince);
      }
      //console.log(`province:`, province);
    };

    getProvince();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address_detail: '',
      province_id: 0 as any,
      district_id: 0 as any,
      ward_code: 0 as any,
    },
  });

  const { watch } = form;

  const watchProvince = watch('province_id');
  const watchDistrict = watch('district_id');

  //getDistrict
  useEffect(() => {
    console.log(watchProvince);
    if (+watchProvince !== 0) {
      const getDistrict = async () => {
        const district: {
          code: number;
          data: [any];
        } = await sendRequest({
          url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${watchProvince}`,
          method: 'GET',
          headers: { Token: NEXT_PUBLIC_KEY_GHN_DEV },
        });

        console.log(district);
        if (district?.data?.length > 0) {
          const newDistrict = district.data.map((item: any) => {
            return {
              DistrictName: item.DistrictName,
              DistrictID: item.DistrictID,
            };
          });
          setDistrict(newDistrict);
        }
      };

      getDistrict();
    }
  }, [watchProvince]);

  useEffect(() => {
    console.log(watchDistrict);
    if (+watchDistrict !== 0) {
      const getWard = async () => {
        const Ward: {
          code: number;
          data: [any];
        } = await sendRequest({
          url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${watchDistrict}`,
          method: 'GET',
          headers: { Token: NEXT_PUBLIC_KEY_GHN_DEV },
        });

        console.log(Ward);
        if (Ward?.data?.length > 0) {
          const newWard = Ward.data.map((item: any) => {
            return {
              WardName: item.WardName,
              WardID: item.WardCode,
            };
          });
          setWard(newWard);
        }
      };

      getWard();
    }
  }, [watchDistrict]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(`data:`, data);

    const createAddress = await sendRequest({
      url: `http://localhost:3000/api/address`,
      method: 'POST',
      body: { ...data },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log(`createAddress:`, createAddress);
    console.log('');
    console.log('');

    if (createAddress) {
      setOpen(false); // Đóng modal
      window.location.reload(); // Reload lại trang
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="province_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chọn tỉnh bạn muốn giao hàng tới</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tỉnh bạn muốn giao hàng " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {province.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.ProvinceID.toString()}>
                        {item.ProvinceName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chọn thành phố hoặc huyện bạn muốn giao hàng tới</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tỉnh bạn muốn giao hàng " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {district.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.DistrictID.toString()}>
                        {item.DistrictName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ward_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chọn chọn phường hoặc huyện bạn muốn giao hàng tới</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tỉnh bạn muốn giao hàng " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ward.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.WardID.toString()}>
                        {item.WardName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_detail"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nhập địa chỉ giao hàng cụ thể : </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} autoComplete="off" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Thêm địa chỉ</Button>
      </form>
    </Form>
  );
}
