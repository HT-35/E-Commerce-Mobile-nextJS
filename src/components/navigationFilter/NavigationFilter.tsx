// ==================

import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

export function NavigationFilter({
  filterData,
  lable,
}: {
  filterData: { lable: string }[];
  lable: string;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border-2  rounded-3xl p-2">
            {lable}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px]  ">
              {filterData.map((item, index) => (
                <Button
                  key={index}
                  className="bg-white text-black border-2 border-black   hover:bg-[#F3F4F6] active:bg-[#F3F4F6]"
                >
                  {item.lable}
                </Button>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
