"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Flex, Form, Input } from "antd";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Bounce, toast } from "react-toastify";

import { sendRequest } from "@/utils/api";
import { authApi } from "@/ListApi/authApi";
import { IUser } from "@/types/next-auth.d";

type FieldType = {
  id?: string;
  otp?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ActiveForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const email = queryParams.get("email");

  console.log("path:", email);

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const { id, otp } = values;
    console.log({ id, otp });

    //// user authenticate() send Data to SignIn, SignIn send call Api
    const Active: any = await sendRequest<IBackendRes<IUser>>({
      method: "POST",
      url: authApi.active(),
      body: { id, otp },
    });

    //Active.error
    console.log("Active:", Active);
    if (Active.error) {
      toast.error(`${Active.message}!!`, {
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
    } else {
      toast.success(`Active Successfull  !!`, {
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
      router.push("/auth/login");
      router.refresh();
    }
  };
  return (
    <div className="border-2 px-4 py-5 max-lg:mx-4  max-lg:py-2 relative  ">
      {/* max-lg:-translate-y-6    -translate-y-12  */}
      <h1 className="absolute text-2xl text-center  bg-white max-w-[224px]   -top-5  max-lg:text-xl  max-lg:max-w-[180px]  ">
        Active Account
      </h1>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          style={{ textAlign: "left", minWidth: "86px" }}
          label="id"
          name="id"
          rules={[
            { required: true, message: "Please input your id!" },
            { type: "string", message: "Please input your id!!!" },
          ]}
          initialValue={id}
          hidden
        >
          <Input disabled />
        </Form.Item>

        <div className="  my-2 ">
          Mã OTP đã được gửi tới email{" "}
          <span className="text-red-500"> {email}</span>
        </div>

        <div className="w-full h-[0.2px] bg-slate-400 my-4"></div>

        <Form.Item<FieldType>
          label="otp"
          name="otp"
          rules={[{ required: true, message: "Please input your  otp!" }]}
        >
          <Input />
        </Form.Item>

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
          >
            Active
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ActiveForm;
