import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useCart } from "../../context/cart";

const CartPage = () => {
  const [cart, setCart] = useCart();
  return (
    <div className="max-w-[1366px] mx-auto">
      <button
        className="w-[114px] h-[45px] bg-white rounded-[23px] mt-7"
        style={{ boxShadow: "0px 3px 6px #8A8A8A19" }}>
        <p>Go Back</p>
      </button>

      <div className="grid grid-cols-3 mt-10 gap-[39px]">
        <div
          className="col-span-2 border w-[897px] h-[386px] rounded-[10px] bg-[#FFFFFF]"
          style={{ boxShadow: "0px 0px 6px #C9C9C919" }}></div>
        <div
          className="border w-[284px] h-[320px] rounded-[10px] bg-[#FFFFFF]"
          style={{ boxShadow: "0px 0px 6px #C9C9C919" }}>
          <p className="text-[14px] p-3 text-center">ORDER SUMMARY</p>
          <div className="bg-[#ECECEC] w-[284px] h-[1px]"></div>
          <div className="text-[14px] flex justify-between items-center p-3">
            <p>Subtotal(2 items)</p>
            <p className="flex justify-center items-center">
              <TbCurrencyTaka /> 4000
            </p>
          </div>
          <div className="text-[14px] flex justify-between items-center px-3 py-0">
            <p>Discount</p>
            <p className="flex justify-center items-center">
              <TbCurrencyTaka /> 0
            </p>
          </div>
          <div className="text-[14px] flex justify-between items-center p-3">
            <p>Shippung Charge</p>
            <p className="flex justify-center items-center">
              <TbCurrencyTaka /> 200
            </p>
          </div>
          <div className="text-[14px] flex justify-between items-center px-3 pb-3">
            <p>Wallet Debit</p>
            <p className="flex justify-center items-center">
              <TbCurrencyTaka /> 0
            </p>
          </div>
          <div className="w-[284px] flex justify-center items-center border-0 border-b border-t border-dashed border-[#ECECEC] h-[60px] relative">
            <input
              type="text"
              name="name"
              className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[242px] mx-auto h-[35px] rounded-[4px]"
            />
            <p className="w-[62px] flex justify-center items-center h-[35px] border border-[#E8E8E8] absolute top-3 right-[21px] rounded-l-[4px] text-[14px] text-[#999999]">
              Apply
            </p>
          </div>
          <div className="text-[14px] flex justify-between items-center px-3 pt-6">
            <p>Total Payable</p>
            <p className="flex justify-center items-center">
              <TbCurrencyTaka /> 0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
