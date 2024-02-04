import { Dialog } from "primereact/dialog";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const SuccessModal = ({ setVisible, visible, title }) => {
  const navigate = useNavigate();
  const handleAdminClick = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("promo");
    navigate("/admin-panel");
  };
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
        {title == "Your Order Placed Successfully" && (
          <button
            className="w-[164px] h-[35px] rounded-[17px] bg-[#FFF700] mx-auto mt-2"
            onClick={handleAdminClick}>
            <p className="text-[15px]">Go to Admin Panel</p>
          </button>
        )}
      </div>
    </Dialog>
  );
};

export default SuccessModal;
