'use client';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';

const ButtonMenu = () => {
  const [active, setActive] = useState(false);

  // Toggle the state between active and inactive
  const handleActive = () => {
    setActive((prev) => !prev);
  };

  const brandArr = [
    { brand: 'Apple' },
    { brand: 'Samsung' },
    { brand: 'Xiaomi' },
    { brand: 'OPPO' },
    { brand: 'Nokia' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={() => handleActive()}>
        {active ? (
          <Cross1Icon height={40} width={40} />
        ) : (
          <HamburgerMenuIcon height={40} width={40} />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Danh Sách Sản Phẩm</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {brandArr.map((item, index) => {
            return (
              <DropdownMenuItem key={index}>
                {item.brand}
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonMenu;
