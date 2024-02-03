import React from "react";

const AllOrder = ({ orderItem }) => {
  console.log("orderItem", orderItem);
  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return 0;
    const discountedAmount = (price * discount) / 100;
    return price - discountedAmount;
  };
  return (
    <div className="">
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

export default AllOrder;
