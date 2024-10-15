'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import React from 'react';

// =========

import { DialogDescription, DialogTrigger } from '@radix-ui/react-dialog';
import { FormCreateProduct } from '@/components/admin/form/CreateProduct';
import { Pencil1Icon } from '@radix-ui/react-icons';

// =========

//
export default function ModalEdit({
  children,
  title,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild className="rounded-lg">
          <Button className="text-white  hover:text-black  hover:bg-slate-400">
            <Pencil1Icon />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="xl:max-w-[1200px] lg:min-h-[700px] max-h-[80vh] max-md:max-w-[380px] overflow-y-auto" // Điều chỉnh chiều cao tối đa và cuộn
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-left text-xl">{title}</DialogTitle>

            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 ">
            {/*<FormCreateProduct />*/}
            {children}
          </div>

          {/*<DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>*/}
        </DialogContent>
      </Dialog>
    </div>
  );
}
