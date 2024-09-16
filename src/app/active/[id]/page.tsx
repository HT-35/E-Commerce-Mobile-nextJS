import ActiveForm from "@/components/auth/activeForm";
import React from "react";

const ActivePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="max-w-[600px] w-full mx-auto flex flex-col justify-center items-center mt-24">
      <div className="w-full">
        <ActiveForm id={id}></ActiveForm>
      </div>
    </div>
  );
};

export default ActivePage;
