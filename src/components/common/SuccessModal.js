import { Dialog } from "primereact/dialog";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
const SuccessModal = ({ setVisible, visible, title }) => {
  return (
    <Dialog
      header="Header"
      visible={visible}
      style={{ width: "271px", boxShadow: "0px 3px 6px #BFBFBF28" }}
      className="h-[204px] bg-[#FFFFFF] rounded-[12px]"
      onHide={() => setVisible(false)}>
      <div className="flex flex-col justify-center items-center mt-7">
        <BsFillCheckCircleFill className="text-[29px] text-center" />
        <p className="mt-3 text-center">{title}</p>
      </div>
    </Dialog>
  );
};

export default SuccessModal;
