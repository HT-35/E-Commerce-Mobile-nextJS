'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FunctionComponent, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { SmileIcon } from '@/components/icons';
import { Imessage } from '@/components/admin/LiveStreamAdmin';

export const FormChatLiveStreamSchema = z.object({
  chat: z.string(),
});

export function InputChatLiveStreamForm({
  handleSendMessageLiveStream,
  handleSetMessage,
}: {
  handleSendMessageLiveStream: any;
  handleSetMessage: any;
}) {
  const [activeEmojiPicker, setActiveEmojiPicker] = useState(false);

  function onSubmitChat(data: z.infer<typeof FormChatLiveStreamSchema>) {
    console.log(data.chat);

    handleSetMessage({ massage: data.chat });
    handleSendMessageLiveStream({ message: data.chat });
    reset({ chat: '' });
  }

  const form = useForm<z.infer<typeof FormChatLiveStreamSchema>>({
    resolver: zodResolver(FormChatLiveStreamSchema),
    defaultValues: {
      chat: '',
    },
  });

  const { handleSubmit, setValue, watch, reset } = form;

  // Xử lý khi chọn emoji
  const handleGetOnEmojiClick = (emojiData: any, event: any) => {
    const currentText = watch('chat');

    const newText = currentText + emojiData.emoji;
    setValue('chat', newText);
    //setMessage((prevMessage: string) => prevMessage + emojiData.emoji);
  };

  const handleActiveEmojiPicker = () => {
    setActiveEmojiPicker((prev: any) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitChat)} className="w-full flex gap-3 items-center">
        <FormField
          control={form.control}
          name="chat"
          render={({ field }) => (
            <FormItem className="w-[95%]">
              <FormControl>
                <Input
                  placeholder="Nhập nội dung ..."
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault(); // Ngăn việc xuống dòng khi nhấn Enter
                      handleSubmit(onSubmitChat)(); // Gọi hàm submit form
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="icon relative w-[50px]" onClick={handleActiveEmojiPicker}>
          <EmojiPicker
            open={activeEmojiPicker}
            onEmojiClick={handleGetOnEmojiClick}
            skinTonesDisabled={false}
            searchDisabled={false}
            reactionsDefaultOpen={true}
            style={{
              position: 'absolute',
              bottom: '60px',
              right: '0px',
              zIndex: '9999',
            }}
          />
          <SmileIcon />
        </div>
      </form>
    </Form>
  );
}
