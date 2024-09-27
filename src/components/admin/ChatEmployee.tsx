'use client';

import UserChat from '@/components/admin/chats/userChat';

import Image from 'next/image';
import React from 'react';

const ChatEmployee = () => {
  return (
    <div className="flex h-[600px] gap-1 overflow-hidden">
      <div className="user basis-3/12  max-h-[82vh] overflow-y-auto  flex flex-col  gap-6 pr-1">
        <UserChat className="text-red-600" name={`Huy Trần `} active>
          Tin nhắn mới : 2
        </UserChat>
        {Array(15)
          .fill(null)
          .map((_, index) => {
            return (
              <UserChat key={index} name={`Huy Trần ${index}`} className="">
                Tin nhắn mới : {index}
              </UserChat>
            );
          })}
      </div>
      <div className="chatMessage basis-9/12  ">
        <div className="header bg-slate-300 rounded-xl p-2">
          <UserChat name={`Huy Trần`} className="">
            {''}
          </UserChat>
        </div>
        <div className="message pl-4 mt-4 max-h-[62vh] overflow-y-auto">
          {Array(16)
            .fill(null)
            .map((item, index) => {
              return (
                <div key={index} className="">
                  <div className="user max-w-[700px]">
                    <div className="rounded-xl bg-slate-400 mb-2 max-w-max px-2 py-[2px]">
                      hello, tôi cần tư vấn
                    </div>
                    <div className="rounded-xl bg-slate-400 mb-2 max-w-max px-2 py-[2px]">
                      hello, tôi cần tư vấn
                    </div>
                  </div>

                  <div className="employee text-right flex flex-col justify-end items-end">
                    <div className=" rounded-xl bg-blue-300 mb-2 max-w-max px-2 py-[2px] text-right">
                      chào anh chị
                    </div>
                    <div className="rounded-xl bg-blue-300 mb-2 max-w-max px-2 py-[2px] text-right">
                      Em có thể tư vấn gì cho anh chị
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="keyBoard input w-full py-1">
          <InputMessage />
        </div>
      </div>
    </div>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function InputMessage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-6"
      >
        <div className="flex justify-start gap-2">
          <div className="w-10/12">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-2/12">
            <Button type="submit" className="w-full">
              Gửi
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ChatEmployee;
