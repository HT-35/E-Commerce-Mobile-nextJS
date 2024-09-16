"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import { Button } from '@/components/ui/button';

import { sendRequest } from "@/utils/api";
import { authApi } from "@/ListApi/authApi";
import { IUser } from "@/types/next-auth.d";

type FieldType = {
  id?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
};

const ForgotPasswordStepTwo = ({
  idUser: id,
  setDisabledBtn,
  nextBtn,
}: {
  idUser?: string;
  setDisabledBtn: any;
  nextBtn: any;
}) => {
  //const [message, setMessage] = useState<string[]>([]);

  const [message, setMessage] = useState<string[] | string>([]);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    setMessage(errorInfo.errorFields[0].errors);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const { id, otp, password, confirmPassword } = values;
    //console.log({ id, otp, password, confirmPassword });

    if (password === confirmPassword) {
      const Active = await sendRequest<IBackendRes<IUser>>({
        method: "POST",
        url: authApi.getNewPassword(),
        body: { id, otp, password },
      });

      //Active.error
      console.log("Active:", Active);
      if (Active?.error) {
        setMessage(Active.message);
      } else if (Active?.statusCode === 201) {
        setDisabledBtn(true);
        nextBtn();

        setMessage("Xác Thực Thành Công !");
      }
    } else {
      setMessage("Xác Nhận Mật Khẩu Khác Với Mật Khẩu Kìa !!");
    }
  };
  return (
    <div className=" px-2 py-2  ">
      <div className="my-2 text-red-500 ">
        Mã Xác Thực Đã Được Gửi Đến Email
      </div>
      <Form
        name="ForgotPasswordTwo"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          style={{ textAlign: "left", minWidth: "86px" }}
          label="OTP"
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

        <Form.Item<FieldType>
          label="OTP"
          name="otp"
          rules={[{ required: true, message: "Vui lòng nhập mã OTP" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Vui lòng nhập xác nhận mật khẩu mới" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <div className="  my-2 ">
          <span className="text-red-500"> {message}</span>
        </div> */}

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

export default ForgotPasswordStepTwo;
