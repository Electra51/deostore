import axios from "axios";
import React, { useState } from "react";

const AllOrder = ({ orderItem, setOrderItem }) => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: status,
        }
      );
      if (status === "Confirm") {
        setConfirmedOrders((prevOrders) => [...prevOrders, orderId]);
      }
      setOrderItem((prevOrderItem) => {
        const updatedOrderItem = prevOrderItem.map((order) => {
          if (order._id === orderId) {
            return {
              ...order,
              status: status,
            };
          }
          return order;
        });
        return updatedOrderItem;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChangeCancel = async (orderId, status) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: status,
        }
      );

      if (status === "Cancel") {
        setCancelledOrders((prevOrders) => [...prevOrders, orderId]);
      }
      setOrderItem((prevOrderItem) => {
        const updatedOrderItem = prevOrderItem.map((order) => {
          if (order._id === orderId) {
            return {
              ...order,
              status: status,
            };
          }
          return order;
        });
        return updatedOrderItem;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-[14px] font-thin">
              <th>SL</th>
              <th>Order ID</th>
              <th>Item</th>
              <th>Buyer Name</th>
              <th className="text-center">Action</th>
              <th>Status</th>
            </tr>
          </thead>{" "}
          <tbody>
            {orderItem?.map((e, i) => {
              console.log("e", e);
              const isConfirmed = confirmedOrders.includes(e._id);
              const isCancelled = cancelledOrders.includes(e._id);
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{e?._id}</td>
                  <td>{e?.products?.length}</td>
                  <td>{e?.buyer?.name}</td>

                  <td className="grid grid-cols-2 justify-center gap-6 items-center">
                    {!isConfirmed && e?.status === "Pending" ? (
                      <button
                        className="w-[114px] h-[45px] rounded-[23px] bg-[#FFF700]"
                        onClick={() => handleStatusChange(e._id, "Confirm")}>
                        <p>Confirm</p>
                      </button>
                    ) : (
                      <button className="w-[114px] h-[45px] rounded-[23px] bg-white"></button>
                    )}
                    {!isCancelled && e?.status === "Pending" ? (
                      <button
                        className="w-[114px] h-[45px] rounded-[23px] bg-[#FF3D3D]"
                        onClick={() =>
                          handleStatusChangeCancel(e._id, "Cancel")
                        }>
                        <p>Cancel</p>
                      </button>
                    ) : (
                      <button className="w-[114px] h-[45px] rounded-[23px] bg-white"></button>
                    )}
                  </td>

                  <td>
                    <button>
                      <p>{e?.status}</p>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrder;
