"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LayOutAuth = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="w-full h-full min-h-screen  lg:pt-14 max-lg:px-4 max-lg:py-6 overflow-x-hidden">
      <div
        className=" max-w-[600px] lg:min-h-[450px]  mx-auto rounded-lg shadow-[0_0_16px_rgba(0,0,0,0.11)] bg-white   flex flex-col justify-center items-center rounded-xl 
        lg:gap-6 lg:py-6 bg-white       max-lg:px-4 max-lg:gap-3 max-lg:py-7
      "
      >
        <div className="flex justify-center items-center  shadow-xl  rounded-xl ">
          <Link
            className={`${
              pathname === "/auth/login"
                ? "bg-[#dc0000] text-white"
                : " hover:bg-white"
            } rounded-xl  py-2 px-8 transition-all duration-300 min-w-32 text-center text-sm `}
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className={`${
              pathname === "/auth/register"
                ? "bg-[#dc0000] text-white"
                : "hover:bg-white"
            } rounded-xl  py-2 px-8 transition-all duration-300 min-w-32 text-center text-sm   `}
            href="/auth/register"
          >
            Register
          </Link>
        </div>
        <div className="w-full transition-all duration-300 mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayOutAuth;
