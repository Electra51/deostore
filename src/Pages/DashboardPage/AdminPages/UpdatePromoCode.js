import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Switch, Space } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import SuccessModal from "../../../components/common/SuccessModal";

const UpdatePromoCode = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [updatePromoVisible, setUpdatePromoVisible] = useState(false);
  const [promoCodee, setPromoCodee] = useState("");
  const [discount, setDiscount] = useState("");
  const [useTime, setUseTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(true);
  const [id, setId] = useState("");
  const handleToggle = (checked) => {
    setActive(checked);
  };

  // Convert value to uppercase
  const setPromoCodees = (value) => {
    const uppercaseValue = value.toUpperCase();
    setPromoCodee(uppercaseValue);
  };
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/promocodes/get-promocode/${params.id}`
      );
      console.log("data.product.name", data.promoCode);

      setId(data.promoCode?._id);
      setDiscount(data.promoCode?.discount_rate);
      setPromoCodee(data.promoCode?.name);
      setUseTime(data.promoCode?.use_time);
      setStartDate(
        new Date(data.promoCode?.start_date).toISOString().split("T")[0]
      );
      setEndDate(
        new Date(data.promoCode?.end_date).toISOString().split("T")[0]
      );

      setActive(data.promoCode?.active);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", promoCodee);
      productData.append("start_date", startDate);
      productData.append("discount_rate", discount);
      productData.append("end_date", endDate);
      productData.append("use_time", useTime);
      productData.append("active", active);

      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/promocodes/update-promocode/${id}`,
        productData
      );
      console.log("add", data);
      setUpdatePromoVisible(true);
      setTimeout(() => {
        setUpdatePromoVisible(false);
        navigate("/dashboard/promocode");
      }, 2000);
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
            readOnly
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
            readOnly
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
      <div className="mb-3 flex justify-center items-center gap-2">
        <button
          className="bg-[#FFF700] w-[180px] h-[45px] rounded-[23px] mt-6"
          onClick={handleUpdate}>
          <p className="text-[14px]">Update PromoCode</p>
        </button>{" "}
      </div>
      <SuccessModal
        visible={updatePromoVisible}
        setVisible={setUpdatePromoVisible}
        title={"Your Promo Code updateed Successfully"}
      />
    </div>
  );
};

export default UpdatePromoCode;
