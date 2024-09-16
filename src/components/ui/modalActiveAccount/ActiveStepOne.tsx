"use client";

import { authApi } from "@/ListApi/authApi";
import { IUser } from "@/types/next-auth.d";
import { sendRequest } from "@/utils/api";
import { Button, Form, FormProps, Input } from "antd";

import { useRouter } from "next/navigation";

import React, { useState } from "react";

type FieldType = {
  email?: string;
};

const ActiveStepOne = ({
  email,
  setIdUser,
  nextBtn,
}: {
  email: string;
  setIdUser: any;
  nextBtn: any;
}) => {
  const router = useRouter();

  const [message, setMessage] = useState<string[]>([]);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    setMessage(errorInfo.errorFields[0].errors);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const { email } = values;

    const sendOtpEmail = await sendRequest<IBackendRes<IUser>>({
      method: "Get",
      url: authApi.getOptEmail(email),
    });

    if (sendOtpEmail.statusCode === 200) {
      setIdUser(sendOtpEmail.data._id);

      nextBtn();

      console.log("sendOtpEmail:", sendOtpEmail);

      //router.refresh();
      //router.push(`/active/${sendOtpEmail?.data}?email=${email}`);
    } else {
      //toast.error(`${Login.error}!!`, {
      //  position: "top-right",
      //  autoClose: 5000,
      //  hideProgressBar: false,
      //  closeOnClick: true,
      //  pauseOnHover: true,
      //  draggable: true,
      //  progress: undefined,
      //  theme: "light",
      //  transition: Bounce,
      //});
    }
  };

  return (
    <div className="px-4 py-5">
      <Form
        name="active"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        //initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="my-4 text-red-500 ">
          Tài Khoản Của Bạn Chưa Được Active, Vui Lòng Tài Khoản Active
        </div>

        <Form.Item<FieldType> label="email" name="email" initialValue={email}>
          <Input placeholder="nhập email của m vào đây" />
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

        <div className="w-full h-[0.2px] bg-slate-400 my-4"></div>
      </Form>
    </div>
  );
};

export default ActiveStepOne;
