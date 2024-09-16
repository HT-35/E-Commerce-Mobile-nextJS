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
import ActiveStepOne from "@/components/ui/modalActiveAccount/ActiveStepOne";
import ActiveStepTwo from "@/components/ui/modalActiveAccount/ActiveStepTwo";
const ModalActive = ({
  email,
  isModalOpen = true,
  setIsModalOpen,
}: {
  email: string;
  isModalOpen: boolean;
  setIsModalOpen: any;
}) => {
  const hasMounted = useHasMounted();

  const [current, setCurrent] = useState(0);

  // chia sẻ data giữa các Step
  const [idUser, setIdUser] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  //const [email, setEmail] = useState("");

  console.log(">>>modal idUser:", idUser);

  if (typeof window === "undefined") {
    return <></>;
  }

  if (!hasMounted) return <></>;

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        title="Basic Modal"
        open={isModalOpen}
        //open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <ActiveStep current={current} steps={steps}></ActiveStep>

        {current === 0 && (
          <ActiveStepOne setIdUser={setIdUser} nextBtn={next} email={email} />
        )}
        {current === 1 && (
          <ActiveStepTwo
            idUser={idUser}
            setDisabledBtn={setDisabledBtn}
            nextBtn={next}
          />
        )}
        {current === 2 && (
          <div className="mt-4 text-green-400 text-lg">
            Kích hoạt tài khoản thành công
          </div>
        )}

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

export default ModalActive;
