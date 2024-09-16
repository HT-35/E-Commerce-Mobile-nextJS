"use client";
import React from "react";
import type { FormProps } from "antd";
import { Checkbox, Form, Input } from "antd";
import { Button } from '@/components/ui/button';

import "./index.css";
import { sendRequest } from "@/utils/api";
import { authApi } from "@/ListApi/authApi";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  password?: string;
  name?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const FormRegister = () => {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: authApi.register(),
      body: {
        email: values.email,

        password: values.password,
        name: values.name,
      },
    });

    if (res.statusCode === 409) {
      toast.error(`Email đã tồn tại !!`, {
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
    } else if (res.statusCode === 201) {
      if (res?.data?._id) {
        const pathIdActive = res?.data?._id;
        router.push(`/active/${pathIdActive}?email=${values.email}`);
      } else {
        toast.error(`${res?.error}`, {
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
      }

      //toast.success(`Tạo tài khoản thành công !!`, {
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

    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("res:", res);
    console.log("");
    console.log("");
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: "100%",
        margin: "20px 0",
        minHeight: "330px",
        //display: "flex",
        //justifyItems: "center",
        //alignItems: "center",
        //flexDirection: "column",
        //width: "100%",
        textAlign: "left",
        minWidth: "86px",
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
            <Form.Item<FieldType>
        style={{ textAlign: "left", minWidth: "86px" }}
        label="Name"
        name="name"
        rules={[{ required: true, message: "Vui lòng không bỏ trống", min: 2 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        style={{ textAlign: "left", minWidth: "86px" }}
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng không bỏ trống" },
          { type: "email", message: "Vui lòng kiểm tra lại và nhập đúng định dạng email" },
        ]}
      >
        <Input autoComplete="email" />
      </Form.Item>

      <Form.Item<FieldType>
        style={{ textAlign: "left", minWidth: "86px" }}
        label="Password"
        name="password"
        rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
      >
        <Input.Password autoComplete="password" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
        <Button className="bg-[#dc0000]" type="primary" htmlType="submit">
        Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
