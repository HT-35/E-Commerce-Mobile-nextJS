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

const listFieldSchema = [
  {
    name: 'name',
    title: 'Tên Người Dùng',
    message: 'Tên người dùng phải từ 3 kí tự trở lên',
  },
  {
    name: 'email',
    title: 'Email',
    message: 'Email phải từ 6 kí tự trở lên',
  },
  {
    name: 'role',
    title: 'Quyền',
    message: '',
  },
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
});

const defaultValues = {
  ...listFieldSchema.reduce(
    (acc, item) => {
      acc[item.name] = '';
      return acc;
    },
    {} as Record<string, string>
  ),
};

export default function FormCreateUser() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { control, handleSubmit, register } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form submitted:', data);
  }

  function onError(errors: any) {
    console.log('Form errors:', errors);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5">
          {listFieldSchema.map((item, index) => {
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
        <Button type="submit" className="xl:mt-20 mt-8 w-full bg-green-400">
          Submit
        </Button>
      </form>
    </Form>
  );
}
