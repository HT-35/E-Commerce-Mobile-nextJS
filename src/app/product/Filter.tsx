'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const filterPrice: { lable: string; value: string }[] = [
  {
    lable: 'dưới 2 tr',
    value: '2000000',
  },
  {
    lable: 'từ 2 - 4 tr',
    value: '2000000 - 4000000',
  },
  {
    lable: 'từ 4 - 8 tr',
    value: '4000000 - 8000000',
  },
  {
    lable: 'từ 8 - 12 tr',
    value: '8000000 - 12000000',
  },
];

const filterRam: { lable: string; value: string }[] = [
  {
    lable: '8 GB',
    value: '8',
  },
  {
    lable: '16 GB',
    value: '16',
  },
  {
    lable: '32 GB',
    value: '32',
  },
];
const filterRom: { lable: string; value: string }[] = [
  {
    lable: '32 GB',
    value: '32',
  },
  {
    lable: '64 GB',
    value: '64',
  },
  {
    lable: '128 GB',
    value: '128',
  },
  {
    lable: '256 GB',
    value: '256',
  },
];
const filterPin: { lable: string; value: string }[] = [
  {
    lable: 'Trên 4000 mAh',
    value: '4000',
  },
  {
    lable: 'Trên 5000 mAh',
    value: '5000',
  },
  {
    lable: 'Trên 6000 mAh',
    value: '6000',
  },
];

const filterOS: { lable: string; value: string }[] = [
  {
    lable: 'Android',
    value: 'Android',
  },
  {
    lable: 'ISO',
    value: 'ISO',
  },
];

export function SelectForm() {
  const form = useForm({
    defaultValues: {
      RAM: '',
      ROM: '',
      Price: '',
      Pin: '',
      OS: '',
    },
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  //className="border-[1px] border-slate-400"

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex justify-between items-center flex-wrap  "
      >
        {/* Price */}
        <FormField
          control={form.control}
          name="Price"
          render={({ field }) => (
            <FormItem className="  outline-none ">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border-[1px] border-slate-400">
                  <SelectTrigger>
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filterPrice.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.value}>
                        {item.lable}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* OS */}
        <FormField
          control={form.control}
          name="OS"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border-[1px] border-slate-400">
                  <SelectTrigger>
                    <SelectValue placeholder="OS" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filterOS.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.value}>
                        {item.lable}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* RAM */}
        <FormField
          control={form.control}
          name="RAM"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border-[1px] border-slate-400">
                  <SelectTrigger>
                    <SelectValue placeholder=" RAM " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filterRam.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.value}>
                        {item.lable}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* ROM */}
        <FormField
          control={form.control}
          name="ROM"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border-[1px] border-slate-400">
                  <SelectTrigger>
                    <SelectValue placeholder="ROM" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filterRom.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.value}>
                        {item.lable}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Pin */}
        <FormField
          control={form.control}
          name="Pin"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border-[1px] border-slate-400">
                  <SelectTrigger>
                    <SelectValue placeholder="Pin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filterPin.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.value}>
                        {item.lable}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit">Lọc</Button>
      </form>
    </Form>
  );
}
