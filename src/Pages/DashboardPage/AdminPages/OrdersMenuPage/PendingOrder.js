import React from "react";

const PendingOrder = ({ orderItem, setOrderItem }) => {
  return (
    <div className="">
      <div className="overflow-x-auto">
        {orderItem?.filter((e) => e?.status === "Pending").length > 0 ? (
          <table className="table">
            <thead>
              <tr className="text-[14px] font-thin">
                <th>SL</th>
                <th>Order ID</th>
                <th>Item</th>
                <th>Buyer Name</th>
                <th>Status</th>
              </tr>
            </thead>{" "}
            <tbody>
              {orderItem
                ?.filter((e) => e?.status === "Pending")
                .map((e, i) => {
                  console.log("e", e);

                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{e?._id}</td>
                      <td>{e?.products?.length}</td>
                      <td>{e?.buyer?.name}</td>

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
        ) : (
          <p>No Orders Pending Yet</p>
        )}
      </div>
    </div>
  );
};

export default PendingOrder;
