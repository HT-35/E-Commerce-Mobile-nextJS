'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/components/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

const FormSchema = z.object({
  OldPassword: z.string().min(1, {
    message: 'Vui lòng không bỏ trống',
  }),
  NewPassword: z.string().min(1, {
    message: 'Vui lòng không bỏ trống',
  }),
  ConfirmPassword: z.string().min(1, {
    message: 'Vui lòng không bỏ trống',
  }),
});

const FormPassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      OldPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Old Password Field */}
          <FormField
            control={form.control}
            name="OldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showOldPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu cũ"
                      {...field}
                      className="pr-10 mt-2 mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showOldPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password Field */}
          <FormField
            control={form.control}
            name="NewPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu mới"
                      {...field}
                      className="pr-10 mt-2 mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showNewPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="ConfirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      {...field}
                      className="pr-10 mt-2 mb-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeClosedIcon />
                      ) : (
                        <EyeOpenIcon />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-[#dc0000] text-white">Lưu</Button>
        </form>
      </Form>
    </>
  );
};

export default FormPassword;
