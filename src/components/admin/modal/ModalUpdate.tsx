'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import React from 'react';

//
export default function ModalUpdate({
  children,
  title,
  activeFormUpdate,
  setActiveFormUpdate,
}: {
  title?: string;
  children?: React.ReactNode;
  activeFormUpdate: any;
  setActiveFormUpdate: any;
}) {
  return (
    <div className="">
      <Dialog
        open={activeFormUpdate}
        onOpenChange={() => setActiveFormUpdate(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-left text-xl">{''}</DialogTitle>
          <DialogDescription>{''}</DialogDescription>
        </DialogHeader>

        <DialogContent
          className="xl:max-w-[1200px] lg:min-h-[700px] max-h-[80vh] max-md:max-w-[380px] overflow-y-auto"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          {/*<DialogTitle>Sửa Sản Phẩm </DialogTitle>*/}
          <DialogHeader>
            <DialogTitle className="text-left text-xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 ">{children}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
