import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import moment from "moment";
import AllOrder from "./AllOrder";
import PendingOrder from "./PendingOrder";
import ConfirmedOrder from "./ConfirmedOrder";
import CancelOrder from "./CancelOrder";

const OrdersPage = () => {
  const [status, setStatus] = useState(["Pending", "Confirm", "cancel"]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [orderItem, setOrderItem] = useState();
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/all-orders"
      );
      setOrders(data);
      setOrderItem(data[0]?.products);
      console.log("data[0]?.products", data[0]?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-9 pl-[22px] ">
      <div className="flex justify-start items-center gap-[33px]">
        <p
          className={`w-[174px] h-[71px] text-[14px] rounded-[8px] cursor-pointer p-3 ${
            toggleState == 1 ? "bg-[#FFF700]" : " bg-[#FFFFFF]"
          }`}
          style={{ boxShadow: "0px 3px 6px #B9B9B91C" }}
          onClick={() => toggleTab(1)}>
          All
        </p>
        <p
          className={`w-[174px] h-[71px] text-[14px] rounded-[8px] cursor-pointer p-3 ${
            toggleState == 2 ? "bg-[#FFF700]" : " bg-[#FFFFFF]"
          }`}
          style={{ boxShadow: "0px 3px 6px #B9B9B91C" }}
          onClick={() => toggleTab(2)}>
          Pending
        </p>
        <p
          className={`w-[174px] h-[71px] text-[14px] rounded-[8px] cursor-pointer p-3 ${
            toggleState == 3 ? "bg-[#FFF700]" : " bg-[#FFFFFF]"
          }`}
          style={{ boxShadow: "0px 3px 6px #B9B9B91C" }}
          onClick={() => toggleTab(3)}>
          Confirmed
        </p>
        <p
          className={`w-[174px] h-[71px] text-[14px] rounded-[8px] cursor-pointer p-3 ${
            toggleState == 4 ? "bg-[#FFF700]" : " bg-[#FFFFFF]"
          }`}
          style={{ boxShadow: "0px 3px 6px #B9B9B91C" }}
          onClick={() => toggleTab(4)}>
          Cancelled
        </p>
      </div>

      <div className="md:mt-[90px] lg:mt-9">
        {toggleState === 1 && <AllOrder orderItem={orderItem} />}
        {toggleState === 2 && <PendingOrder />}
        {toggleState === 3 && <ConfirmedOrder />}
        {toggleState === 4 && <CancelOrder />}
      </div>
    </div>
  );
};

export default OrdersPage;
