import React, { useState } from "react";
import { Switch, Space } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPromoCode = () => {
  const [promoCodee, setPromoCodee] = useState("");
  const [discount, setDiscount] = useState("");
  const [useTime, setUseTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [active, setActive] = useState(true);
  const navigate = useNavigate();
  const resetForm = () => {
    setPromoCodee("");
    setDiscount("");
    setUseTime("");
    setStartDate("");
    setEndDate("");
    setActive(true);
  };
  const setPromoCodees = (value) => {
    // Convert value to uppercase before setting it in the state
    const uppercaseValue = value.toUpperCase();
    setPromoCodee(uppercaseValue);
  };
  const handleToggle = (checked) => {
    setActive(checked);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", promoCodee);
      productData.append("start_date", startDate);
      productData.append("discount_rate", discount);
      productData.append("end_date", endDate);
      productData.append("use_time", useTime);

      productData.append("active", active);
      //   console.log("hi", productData);
      const { data } = axios.post(
        "http://localhost:8080/api/v1/promocodes/create-promocode",
        productData
      );
      if (data?.success) {
        console.log("add", data);
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        // resetForm(); // Reset the form fields
        // navigate("/dashboard/products");
      }
    } catch (error) {
      console.log(error);
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
            {/* Custom Switch with "Yes" and "No" labels */}
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
          <p className="text-[14px]"> Add</p>
        </button>
      </div>
    </div>
  );
};

export default AddPromoCode;
