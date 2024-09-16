"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Checkbox, Form, Input } from "antd";
import { Button } from '@/components/ui/button';

import Link from "next/link";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Bounce, toast } from "react-toastify";

import { authenticate } from "@/components/auth/serverComponentLogin/action";
import { sendRequest } from "@/utils/api";
import { authApi } from "@/ListApi/authApi";
import { IUser } from "@/types/next-auth.d";
import ModalActive from "@/components/ui/modalActiveAccount/ModalActive";
import { useHasMounted } from "@/customsHooks/useHasMounted";
import ModalForgotPassword from "@/components/ui/modalForgotPassword/ModalForgotPassword";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const FormLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalForgotPassword, setIsModalForgotPassword] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const router = useRouter();

  const params = useSearchParams();

  const callback = params.get("callback") ?? "/";

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const { email, password } = values;

    setUserEmail("");

    // user authenticate() send Data to SignIn, SignIn send call Api
    const Login = await authenticate(email, password);
    console.log("Login:", Login);

    //Login.error
    if (Login?.code === 1) {
      toast.error(`${Login.error}!!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (Login?.code === 2) {
      setIsModalOpen(true);
      setUserEmail(email);
    } else {
      toast.success(`Login Successfull  !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      router.push(callback);
      router.refresh();
    }
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: "100%",
          margin: "20px 0",
          minHeight: "330px",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          style={{ textAlign: "left", minWidth: "86px" }}
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng không bỏ trống" },
            { type: "email", message: "Vui lòng kiểm tra lại và nhập đúng định dạng email" },
          ]}
          //initialValue={"huytran.itvn@gmail.com"}
        >
          <Input autoComplete="email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
          //initialValue={"123123"}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> wrapperCol={{ offset: 3, span: 16 }}>
  <div className="flex items-center justify-between">
    <Checkbox>Remember me</Checkbox>
    <button
      type="button"
      className="text-red-400"
      onClick={() => {
        setIsModalForgotPassword(true);
      }}
    >
      Quên mật khẩu?
    </button>
  </div>
</Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button className="bg-[#dc0000] text-white" htmlType="submit">
          Đăng nhập
          </Button>
        </Form.Item>
          <span className="flex justify-center">Bạn chưa có tài khoản? <Link href="/auth/register">Tạo tài khoản</Link></span>
          <Button className="flex justify-center mx-auto mt-[10px] bg-white text-black">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" className="h-[30px] w-[30px] mr-2 flex items-center float-left"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>       
        <span>Đăng nhập bằng Google</span>
    </Button>
      </Form>
      <ModalActive
        email={userEmail}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalActive>
      <ModalForgotPassword
        setIsModalForgotPassword={setIsModalForgotPassword}
        isModalForgotPassword={isModalForgotPassword}
      ></ModalForgotPassword>
    </>
  );
};

export default FormLogin;
