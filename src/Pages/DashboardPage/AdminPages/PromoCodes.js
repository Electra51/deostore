import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PromoCodes = () => {
  const [products, setProducts] = useState([]);
  const [promosActive, setPromosActive] = useState([]);
  //getall products
  const getAllPromo = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/promocodes/get-promocode"
      );
      setProducts(data.promoCode);
      console.log("data", data.promoCode);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  useEffect(() => {
    getAllPromo();
  }, []);
  // Function to format date
  const formatCreatedAt = (createdAt) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return new Date(createdAt).toLocaleString("en-US", options);
  };

  const handleStatusChange = async (id, active) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/promocodes/update-promocode-status/${id}`,
        { active: !active }
      );
      console.log("hi");
      if (data.success) {
        getAllPromo();
        setPromosActive((prevProducts) =>
          prevProducts.map((promo) =>
            promo._id === id ? { ...promo, active: !promo.active } : promo
          )
        );
        toast.success(data.message);
        console.log("first", data);
        // Refresh promo codes after status change
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Link to="http://localhost:3000/dashboard/addpromocode">
        {" "}
        <button
          className="w-[189px] h-[45px] mt-[30px] ml-[55px] rounded-[23px]"
          style={{ boxShadow: "0px 3px 6px #8A8A8A19" }}>
          <p className="text-[#1A1A1A] text-[14px]">Add New Promo</p>
        </button>
      </Link>

      <div className="space-y-3 max-w-6xl mx-auto mt-10">
        {products?.map((promo, i) => {
          console.log(promo);
          return (
            <div
              key={i}
              className="w-[1221px] h-[139px] bg-[#FFFFFF] flex flex-col justify-normal items-center rounded-[10px] hover:bg-base-200 px-8"
              style={{ boxShadow: "0px 3px 6px #DEDEDE29" }}>
              <div className="grid grid-cols-2 gap-2 justify-items-stretch items-center py-2.5 border-0 border-b">
                <div className="flex justify-start items-center gap-4">
                  <p>{i + 1}</p>
                  <p>{promo.name}</p>
                </div>{" "}
                <div className="flex justify-end items-center gap-4">
                  <Link to={`/dashboard/promocode/${promo._id}`}>
                    <button className="w-[114px] h-[45px] rounded-[23px] bg-[#FFF700]">
                      <p>Edit</p>
                    </button>
                  </Link>

                  <button
                    className={`${
                      promo.active === true ? "bg-[#FFE1E1]" : "bg-[#FFFEE1] "
                    } w-[114px] h-[45px] rounded-[23px] `}
                    onClick={() => handleStatusChange(promo._id, promo.active)}>
                    <p
                      className={`${
                        promo.active === true
                          ? "text-[#FF0729]"
                          : "text-[#7A4100]"
                      }`}>
                      {promo.active === true ? "Deactive" : "Activate"}
                    </p>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 justify-between items-center py-2.5">
                <p>Created at: {formatCreatedAt(promo.createdAt)}</p>
                <p>Usages: {promo.use_time}</p>{" "}
                <p>Discount Rate: {promo.discount_rate}%</p>
                <p>Start Date: {moment(promo.start_date).format("l")}</p>
                <p>End Date: {moment(promo.end_date).format("l")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromoCodes;
