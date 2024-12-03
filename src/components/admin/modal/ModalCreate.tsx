'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import React from 'react';

import { DialogDescription, DialogTrigger } from '@radix-ui/react-dialog';

//
export default function ModalCreate({
  children,
  activeForm,
  setActiveForm,
}: {
  children?: React.ReactNode;
  activeForm?: boolean;
  setActiveForm?: any;
}) {
  return (
    <div className="">
      <Dialog open={activeForm} onOpenChange={() => setActiveForm(false)}>
        <DialogHeader>
          <DialogTitle className="text-left text-xl">{''}</DialogTitle>
          <DialogDescription>{''}</DialogDescription>
        </DialogHeader>

        <DialogContent
          className="xl:max-w-[1200px] lg:min-h-[700px] max-h-[80vh] max-md:max-w-[380px] overflow-y-auto" // Điều chỉnh chiều cao tối đa và cuộn
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 ">{children}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
