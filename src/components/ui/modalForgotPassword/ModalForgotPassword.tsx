"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useHasMounted } from "@/customsHooks/useHasMounted";
import ActiveStep from "@/components/ui/steps/Steps";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ForgotPasswordStepOne from "@/components/ui/modalForgotPassword/ForgotPasswordStepOne";
import ForgotPasswordStepTwo from "@/components/ui/modalForgotPassword/ForgotPasswordStepTwo";

const ModalForgotPassword = ({
  isModalForgotPassword = true,
  setIsModalForgotPassword,
}: {
  isModalForgotPassword: boolean;
  setIsModalForgotPassword: any;
}) => {
  const hasMounted = useHasMounted();

  const [current, setCurrent] = useState(0);

  // chia sẻ data giữa các Step
  const [idUser, setIdUser] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);

  const [email, setEmail] = useState("");

  console.log(">>>modal idUser:", idUser);

  if (typeof window === "undefined") {
    return <></>;
  }

  if (!hasMounted) return <></>;

  const handleOk = () => {
    setIsModalForgotPassword(false);
  };

  const handleCancel = () => {
    setIsModalForgotPassword(false);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Login",
      //status: "finish",
      icon: <UserOutlined style={{ color: "#dc0000" }} />,
    },
    {
      title: "Verification",
      //status: "finish",
      icon: <LoadingOutlined style={{ color: "#dc0000" }} />,
    },
    {
      title: "Done",
      status: "wait",
      icon: <SmileOutlined style={{ color: "#dc0000" }} />,
    },
  ];

  return (
    <>
      <Modal
        title="Quên mật khẩu"
        open={isModalForgotPassword}
        //open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        {/* step */}
        <ActiveStep current={current} steps={steps}></ActiveStep>

        {/* data of steps current */}
        {current === 0 && (
          <ForgotPasswordStepOne setIdUser={setIdUser} nextBtn={next} />
        )}
        {current === 1 && (
          <ForgotPasswordStepTwo
            idUser={idUser}
            setDisabledBtn={setDisabledBtn}
            nextBtn={next}
          />
        )}
        {/* {current === 2 && (
          <div className="mt-4 text-green-400 text-lg">
            M đã đổi mật khẩu thành công, đừng quên nữa nha cha !!
          </div>
        )} */}

        {/* button steps */}
        <div style={{ marginTop: 24 }}>
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => handleCancel()}>
              Done
            </Button>
          )}
          {current > 0 && current < steps.length - 1 && (
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => prev()}
              disabled={disabledBtn}
            >
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalForgotPassword;
