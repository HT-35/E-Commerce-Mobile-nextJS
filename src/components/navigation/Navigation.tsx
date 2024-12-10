import Menu from '@/components/menu/Menu';
import SideBar from '@/components/navigation/SideBar';
import Slider from '@/components/navigation/Slider';

const Navigation = ({
  menu = true,
  subBanner,
  Banner,
}: {
  menu?: boolean;
  Banner: {
    index: number;
    url: string;
  }[];
  subBanner: {
    index: number;
    url: string;
  }[];
}) => {
  return (
    <div className={`navigation text-black lg:flex  lg:gap-4 select-none ${menu ? 'lg:flex-row' : ''}`}>
      <div className={`  ${menu ? 'lg:basis-5/6' : ''}`}>
        <Slider menu={menu} Banner={Banner}></Slider>
      </div>

      <div className={`sub-side-bar      shadow-xl  w-full  max-lg:hidden ${menu ? 'basis-1/6' : ''}`}>
        <SideBar menu={menu} subBanner={subBanner}></SideBar>
      </div>
    </div>
  );
};

export default Navigation;
