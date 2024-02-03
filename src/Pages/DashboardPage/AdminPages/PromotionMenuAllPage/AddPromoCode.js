import React, { useState } from "react";
import { Switch, Space } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../../../components/common/SuccessModal";

const AddPromoCode = () => {
  const [promoCodee, setPromoCodee] = useState("");
  const [discount, setDiscount] = useState("");
  const [useTime, setUseTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addPromoVisible, setAddPromoVisible] = useState(false);
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  // Convert value to uppercase
  const setPromoCodees = (value) => {
    const uppercaseValue = value.toUpperCase();
    setPromoCodee(uppercaseValue);
  };
  const handleToggle = (checked) => {
    setActive(checked);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!promoCodee) {
      toast.error("Please enter Promo Code");
      isValid = false;
    }

    if (!startDate) {
      toast.error("Please enter Start Date");
      isValid = false;
    }

    if (!endDate) {
      toast.error("Please enter End Date");
      isValid = false;
    }

    if (!discount) {
      toast.error("Please enter Discount Rate");
      isValid = false;
    }

    if (!useTime) {
      toast.error("Please enter Use Time");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    try {
      const productData = new FormData();
      productData.append("name", promoCodee);
      productData.append("start_date", startDate);
      productData.append("discount_rate", discount);
      productData.append("end_date", endDate);
      productData.append("use_time", useTime);
      productData.append("active", active);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/promocodes/create-promocode`,
        productData
      );

      setAddPromoVisible(true);
      setTimeout(() => {
        setAddPromoVisible(false);
        navigate("/dashboard/promocode");
      }, 2000);
    } catch (error) {
      console.log(error?.response);
      toast.error("something went wrong");
    }
  };
  return (
    <div
      className="w-[296px] h-[555px] rounded-[15px] mx-auto pt-6 mt-6"
      style={{ boxShadow: "0px 3px 6px #0000001C" }}>
      <div className="w-[232px] mx-auto mt-4">
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Promo Code</p>
          </label>
          <input
            type="text"
            name="name"
            value={promoCodee}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setPromoCodees(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Start Date</p>
          </label>
          <input
            type="date"
            name="start_date"
            value={startDate}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>{" "}
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">End Date</p>
          </label>
          <input
            type="date"
            name="end_date"
            value={endDate}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>{" "}
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Discount Rate</p>
          </label>
          <input
            type="text"
            name="discount_rate"
            value={discount}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Use Time</p>
          </label>
          <input
            type="text"
            name="use_time"
            value={useTime}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setUseTime(e.target.value)}
          />
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label>
            <p className="text-[14px] mb-1">Active</p>
          </label>
          <Space direction="vertical">
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              checked={active}
              onChange={handleToggle}
            />
          </Space>
        </div>
      </div>
      <div className="mb-3 flex justify-center items-center">
        <button
          className="bg-[#FFF700] w-[134px] h-[45px] rounded-[23px] mt-6"
          onClick={handleCreate}>
          <p className="text-[14px] font-medium"> Add</p>
        </button>
      </div>

      <SuccessModal
        visible={addPromoVisible}
        setVisible={setAddPromoVisible}
        title={"Your Promo Code Added Successfully"}
      />
    </div>
  );
};

export default AddPromoCode;
