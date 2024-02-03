import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PromoCodes = () => {
  const [products, setProducts] = useState([]);
  const [promosActive, setPromosActive] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPromo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/promocodes/get-promocode`
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

  // date format according to UI
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

  //active deactive functionality
  const handleStatusChange = async (id, active) => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/promocodes/update-promocode-status/${id}`,
        { active: !active }
      );

      if (data.success) {
        setPromosActive((prevProducts) =>
          prevProducts.map((promo) =>
            promo._id === id ? { ...promo, active: !promo.active } : promo
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      getAllPromo();
    }
  };
  return (
    <div className="ml-[55px]">
      <Link to="http://localhost:3000/dashboard/addpromocode">
        <button
          className="w-[189px] h-[45px] mt-[30px] rounded-[23px] border hover:bg-[#FFF700]"
          style={{ boxShadow: "0px 3px 6px #8A8A8A19" }}>
          <p className="text-[#1A1A1A] text-[14px]">Add New Promo</p>
        </button>
      </Link>

      <div className="space-y-5 max-w-[1300px] my-10">
        {products?.map((promo, i) => {
          console.log(promo);
          return (
            <div
              key={i}
              className="h-[139px] bg-[#FFFFFF] rounded-[10px] hover:bg-base-100 px-8 border py-3"
              style={{ boxShadow: "0px 3px 6px #DEDEDE29" }}>
              <div className="flex justify-between border-0 py-2.5 border-b">
                {" "}
                <div className="flex justify-start items-center gap-4">
                  <p>{i + 1}</p>
                  <p>{promo.name}</p>
                </div>{" "}
                <div className="flex justify-end items-center gap-4">
                  <Link to={`/dashboard/promocode/${promo._id}`}>
                    <button className="w-[114px] h-[45px] rounded-[23px] bg-[#FFF700]">
                      <p className="text-[14px]">Edit</p>
                    </button>
                  </Link>

                  <button
                    className={`${
                      promo.active === true ? "bg-[#FFE1E1]" : "bg-[#FFFEE1] "
                    } w-[114px] h-[45px] rounded-[23px] `}
                    onClick={() => handleStatusChange(promo._id, promo.active)}
                    disabled={loading}>
                    {loading ? (
                      <p>Updating...</p>
                    ) : promo.active === true ? (
                      <p className="text-[#FF0729] text-[14px]">Deactive</p>
                    ) : (
                      <p className="text-[#7A4100] text-[14px]">Active</p>
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-5 justify-between items-center py-2.5">
                <p>
                  Created at:{" "}
                  <span className="text-[15px]">
                    {formatCreatedAt(promo.createdAt)}
                  </span>
                </p>
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
