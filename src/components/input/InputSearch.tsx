import { IconSearch } from '@/components/icons';
import { Input } from '@/components/ui/input';

export const InputSearch = ({
  placeholder = 'Bạn tìm gì ...',
  className = '',
}: {
  placeholder?: string;
  className?: string;
}) => (
  <div className="search relative w-full max-2xl:max-w-[20%] 2xl:max-w-[350px]">
    <Input
      className={`pr-10  placeholder:text-white ${className}`}
      placeholder={placeholder}
    ></Input>
    <div className="absolute top-[50%] -translate-y-[50%] right-2">
      <IconSearch></IconSearch>
    </div>
  </div>
);