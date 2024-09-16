"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

import { sendRequest } from "@/utils/api";
import { authApi } from "@/ListApi/authApi";
import { IUser } from "@/types/next-auth.d";

type FieldType = {
  id?: string;
  otp?: string;
};

const ActiveStepTwo = ({
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
    const { id, otp } = values;
    console.log({ id, otp });

    //// user authenticate() send Data to SignIn, SignIn send call Api
    const Active = await sendRequest<IBackendRes<IUser>>({
      method: "POST",
      url: authApi.active(),
      body: { id, otp },
    });

    //Active.error
    console.log("Active:", Active);
    if (Active.error) {
      setMessage(Active.message);
    } else if (Active.statusCode === 201) {
      setDisabledBtn(true);
      nextBtn();
      setMessage("Xác Thực Thành Công !");
    }
  };
  return (
    <div className=" px-4 py-5  ">
      <div className="my-4 text-red-500 ">
        Mã Xác Thực Đã Được Gửi Đến Email
      </div>
      <Form
        name="ActiveStepTwo"
        wrapperCol={{ span: 24 }}
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

        <Form.Item<FieldType>
          name="otp"
          rules={[{ required: true, message: "Please input your  otp!" }]}
        >
          <Input placeholder="Nhập Mã Xác Thực Đi Thằng Ngu !!" />
        </Form.Item>
        <div className="  my-2 ">
          <span className="text-red-500"> {message}</span>
        </div>
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

export default ActiveStepTwo;
