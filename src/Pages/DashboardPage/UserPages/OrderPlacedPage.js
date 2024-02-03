import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";

const OrderPlacedPage = () => {
  const [Orders, setOrders] = useState();
  const [orderItem, setOrderItem] = useState();
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders"
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
  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return 0;
    const discountedAmount = (price * discount) / 100;
    return price - discountedAmount;
  };
  return (
    <div className="w-[1300px] py-10 px-5">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Color</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>{" "}
          <tbody>
            {/* row 1 */}
            {orderItem?.map((e, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{e?.name}</td>
                  <td>
                    {" "}
                    BDT.{" "}
                    {calculateDiscountedPrice(e?.price, e?.discount).toFixed(2)}
                  </td>
                  <td>{e?.color}</td>
                  <td>{e?.size}</td>
                  <td>
                    <button>
                      <p>Pending</p>
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

export default OrderPlacedPage;
