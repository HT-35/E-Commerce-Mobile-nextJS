'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const CreateLiveStreamFormSchema = z.object({
  livestream: z.string().min(3, {
    message: 'Tiêu đề livestream tối hiểu 3 kí tự',
  }),
});

export function CreateLiveStreamForm({ onSubmit }: { onSubmit: any }) {
  const form = useForm<z.infer<typeof CreateLiveStreamFormSchema>>({
    resolver: zodResolver(CreateLiveStreamFormSchema),
    defaultValues: {
      livestream: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  gap-2 max-w-[500px] mx-auto py-6">
        <FormField
          control={form.control}
          name="livestream"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel className="text-2xl">LiveStream</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nhập Title LiveStream ..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Bắt đầu Livestream
        </Button>
      </form>
    </Form>
  );
}
