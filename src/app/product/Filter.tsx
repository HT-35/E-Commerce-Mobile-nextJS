'use client';

import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const filterRam: { lable: string; value: string }[] = [
  {
    lable: 'RAM',
    value: 'RAM',
  },
  {
    lable: '8GB',
    value: '8GB',
  },
  {
    lable: '12GB',
    value: '12GB',
  },
  {
    lable: '16GB',
    value: '16GB',
  },
  {
    lable: '32GB',
    value: '32GB',
  },
];
const filterRom: { lable: string; value: string }[] = [
  {
    lable: 'ROM',
    value: 'ROM',
  },
  {
    lable: '32GB',
    value: '32GB',
  },
  {
    lable: '64GB',
    value: '64GB',
  },
  {
    lable: '128GB',
    value: '128GB',
  },
  {
    lable: '256GB',
    value: '256GB',
  },
];

const filterOS: { lable: string; value: string }[] = [
  {
    lable: 'OS',
    value: 'OS',
  },
  {
    lable: 'ANDROID',
    value: 'ANDROID',
  },
  {
    lable: 'ISO',
    value: 'ISO',
  },
  {
    lable: 'MIUI',
    value: 'MIUI',
  },
];

export function SelectForm({ setFilter }: { setFilter: any }) {
  const form = useForm({
    defaultValues: {
      RAM: '',
      ROM: '',

      OS: '',
    },
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  const handleGetRAM = async (e: any) => {
    console.log(e);
    if (e === 'RAM') {
      setFilter((data: any) => ({ ...data, RAM: '' }));
    } else {
      setFilter((data: any) => ({ ...data, RAM: e }));
    }
  };

  const handleGetROM = (e: any) => {
    if (e === 'ROM') {
      setFilter((data: any) => ({ ...data, ROM: '' }));
    } else {
      setFilter((data: any) => ({ ...data, ROM: e }));
    }
  };

  const handleGetOS = (e: any) => {
    if (e === 'OS') {
      setFilter((data: any) => ({ ...data, OS: '' }));
    } else {
      setFilter((data: any) => ({ ...data, OS: e }));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex justify-start gap-20 items-center flex-wrap  ">
        {/* OS */}
        <FormField
          control={form.control}
          name="OS"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(event: any) => {
                  field.onChange;
                  handleGetOS(event);
                }}
                defaultValue={field.value}
              >
                <FormControl className="border-[1px] border-slate-400 bg-white">
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
              <Select
                onValueChange={(event: any) => {
                  field.onChange;
                  handleGetRAM(event);
                }}
                defaultValue={field.value}
              >
                <FormControl className="border-[1px] border-slate-400 bg-white">
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
              <Select
                onValueChange={(event: any) => {
                  field.onChange;
                  handleGetROM(event);
                }}
                defaultValue={field.value}
              >
                <FormControl className="border-[1px] border-slate-400 bg-white">
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

        {/*<Button type="submit">Lọc</Button>*/}
      </form>
    </Form>
  );
}
