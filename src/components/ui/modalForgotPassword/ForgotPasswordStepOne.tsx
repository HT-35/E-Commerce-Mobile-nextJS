"use client";

import { authApi } from "@/ListApi/authApi";
import { IUser } from "@/types/next-auth.d";
import { sendRequest } from "@/utils/api";
import { Form, FormProps, Input } from "antd";
import { Button } from '@/components/ui/button';

import { useRouter } from "next/navigation";

import React, { useState } from "react";

type FieldType = {
  email?: string;
};

const ForgotPasswordStepOne = ({
  setIdUser,
  nextBtn,
}: {
  setIdUser: any;
  nextBtn: any;
}) => {
  const [message, setMessage] = useState("");

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const { email } = values;

    const sendOtpEmail = await sendRequest<IBackendRes<IUser>>({
      method: "POST",
      url: authApi.resetPassword(),
      body: {
        email,
      },
    });

    console.log("");
    console.log("");
    console.log("sendOtpEmail", sendOtpEmail);
    console.log("");
    console.log("");
    console.log("");

    if (sendOtpEmail.statusCode === 201) {
      setIdUser(sendOtpEmail?.data?._id);

      nextBtn();

      console.log("sendOtpEmail:", sendOtpEmail);
    } else {
      setMessage(sendOtpEmail?.message);
      console.log(sendOtpEmail);
    }
  };

  return (
    <div className="px-2 py-2">
      <Form
        name="ForgotPasswordOne"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* <div className="my-4 text-red-500 ">
          Nhập địa chỉ email của m vào đây để bố m kiếm tài khoản cho m !!
        </div> */}

        <Form.Item<FieldType>
          label="Email address"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ email" },
            { type: "email", message: "Vui lòng kiểm tra lại và nhập đúng định dạng email" },
          ]}
        >
          <Input
            className="ml-[10px] w-[97%]"
            onChange={() => setMessage("")}
          />
        </Form.Item>

        {message && <div className="text-red-500 my-2">{message} !!!</div>}

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button
            className="bg-[#dc0000]"
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
          >
            Kích hoạt
          </Button>
        </div>

        <div className="w-full h-[0.2px] bg-slate-400 my-4"></div>
      </Form>
    </div>
  );
};

export default ForgotPasswordStepOne;
