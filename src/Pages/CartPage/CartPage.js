import React, { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline, MdPlusOne } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [quantities, setQuantities] = useState({});

  // Load quantities from localStorage on component mount
  useEffect(() => {
    const storedQuantities = localStorage.getItem("quantities");
    if (storedQuantities) {
      setQuantities(JSON.parse(storedQuantities));
    }
  }, []);

  // Update localStorage whenever quantities change
  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return 0;
    const discountedAmount = (price * discount) / 100;
    return price - discountedAmount;
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      localStorage.removeItem("quantities");
    } catch (error) {
      console.log(error);
    }
  };

  const totalItemPrice = (price, discount, shipping_charge) => {
    if (!price || !discount) return 0;

    const discountedAmount = (price * discount) / 100;
    const totalPrice = price - discountedAmount + shipping_charge;

    return isNaN(totalPrice) ? 0 : totalPrice;
  };

  const handleQuantityChange = (pid, action) => {
    let updatedQuantities = { ...quantities };
    let quantity = updatedQuantities[pid] || 1;
    console.log("first");
    if (action === "increment") {
      quantity += 1;
    } else if (action === "decrement" && quantity > 1) {
      quantity -= 1;
    }

    updatedQuantities[pid] = quantity;
    setQuantities(updatedQuantities);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    cart.forEach((product) => {
      const price = calculateDiscountedPrice(product?.price, product?.discount);
      const quantity = quantities[product?._id] || 1;
      subtotal += price * quantity;
    });

    return subtotal.toFixed(2);
  };

  const calculateShippingChargeForsub = () => {
    let subShippingCharge = 0;

    cart.forEach((product) => {
      const price = product?.shipping_charge;
      const quantity = quantities[product?._id] || 1;
      subShippingCharge += price * quantity;
    });

    return subShippingCharge.toFixed(2);
  };

  const calculateTotalPayable = () => {
    let subShippingCharge =
      parseFloat(calculateSubtotal()) +
      parseFloat(calculateShippingChargeForsub());
    return subShippingCharge.toFixed(2);
  };

  return (
    <div className="max-w-[1366px] mx-auto">
      <button
        className="w-[114px] h-[45px] bg-white rounded-[23px] mt-7"
        style={{ boxShadow: "0px 3px 6px #8A8A8A19" }}>
        <p>Go Back</p>
      </button>
      {location.pathname}
      <h1 className="text-center bg-light p-2 mb-1">
        {!auth?.user
          ? "Hello Guest"
          : `Hello  ${auth?.token && auth?.user?.name}`}
        <p className="text-center">
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout !"
              }`
            : " Your Cart Is Empty"}
        </p>
      </h1>
      <div className="grid grid-cols-3 mt-10 gap-[39px]">
        <div
          className="col-span-2 border w-[897px] h-[386px] rounded-[10px] bg-[#FFFFFF]"
          style={{ boxShadow: "0px 0px 6px #C9C9C919" }}>
          {cart?.map((product, i) => {
            return (
              <div
                className="px-6 py-6  grid grid-cols-3 gap-12 border-0 border-b border-[#ECECEC]"
                key={i}>
                <div className=" flex justify-start items-start gap-[16px]">
                  <div className="w-[89px] h-[96px] overflow-hidden">
                    <img
                      src={`http://localhost:8080/api/v1/products/product-photo/${product?._id}`}
                      alt="product image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="h-[38px] text-[14px]">{product?.name}</p>
                    <div className="flex justify-between items-center gap-5">
                      <p className="text-[14px]">Color: {product?.color}</p>
                      <p className="text-[14px]">Size: {product?.size}</p>
                    </div>
                    <p className="h-[38px] text-[14px] text-nowrap mt-2">
                      Product Price: BDT.
                      {(
                        calculateDiscountedPrice(
                          product?.price,
                          product?.discount
                        ) * quantities[product?._id] || 1
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  {" "}
                  <p className="h-[38px] text-[14px]"></p>
                  <p className="text-[14px] text-nowrap">
                    Shipping Method: {product?.shipping_method}
                  </p>{" "}
                  <p className="text-[14px] text-nowrap mt-2">
                    Shipping Charge:{" "}
                    {product?.shipping_charge * quantities[product?._id] || 1}
                  </p>
                </div>
                <div>
                  <div className="h-[38px] text-[14px] flex justify-end items-start cursor-pointer">
                    <MdOutlineDeleteOutline
                      className="text-[17px]"
                      onClick={() => removeCartItem(product?._id)}
                    />
                  </div>
                  <div className="flex justify-normal items-center gap-5">
                    <p className="text-[14px]">Quantity:</p>
                    <div className="w-[80px] h-[24px] border border-[#ECECEC] rounded-xl flex justify-around items-center">
                      <FiPlus
                        className=" cursor-pointer"
                        onClick={() =>
                          handleQuantityChange(product?._id, "increment")
                        }
                      />
                      <p>{quantities[product?._id] || 1}</p>
                      <FiMinus
                        className=" cursor-pointer"
                        onClick={() =>
                          handleQuantityChange(product?._id, "decrement")
                        }
                      />
                    </div>
                  </div>
                  <p className="h-[38px] text-[14px] text-nowrap mt-2">
                    Total Price: BDT.
                    {(
                      totalItemPrice(
                        product?.price,
                        product?.discount,
                        product?.shipping_charge
                      ) * (quantities[product?._id] || 1)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between items-center p-3">
            <div className="flex justify-normal items-center gap-2">
              {" "}
              <input
                type="radio"
                name="radio-4"
                className="radio radio-warning h-[20px] w-[20px]"
              />
              <p className="text-[14px]">
                I agree to the Terms and Conditions, Privacy Policy & Refund
                Policy.
              </p>
            </div>
            <div className="w-[219px] h-[44px] bg-[#FFF700] flex justify-center items-center">
              <p className="text-[14px]">CHECKOUT</p>
            </div>
          </div>
        </div>
        <div
          className="border w-[284px] h-[320px] rounded-[10px] bg-[#FFFFFF]"
          style={{ boxShadow: "0px 0px 6px #C9C9C919" }}>
          <p className="text-[14px] p-3 text-center">ORDER SUMMARY</p>
          <div className="bg-[#ECECEC] w-[284px] h-[1px]"></div>
          <div className="text-[14px] flex justify-between items-center p-3">
            <p>Subtotal(2 items)</p>
            <p className="flex justify-center items-center">
              <TbCurrencyTaka /> {calculateSubtotal()}
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
              <TbCurrencyTaka /> {calculateShippingChargeForsub()}
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
            {!auth.user ? (
              <Link
                to="/signin"
                state={{ fromCart: true }}
                className="w-[62px] flex justify-center items-center h-[35px] border border-[#E8E8E8] absolute top-3 right-[21px] rounded-l-[4px] text-[14px] text-[#999999] cursor-pointer">
                Apply
              </Link>
            ) : (
              <p className="w-[62px] flex justify-center items-center h-[35px] border border-[#E8E8E8] absolute top-3 right-[21px] rounded-l-[4px] text-[14px] text-[#999999] cursor-pointer">
                Apply
              </p>
            )}
          </div>
          <div className="text-[14px] flex justify-between items-center px-3 pt-6">
            <p>Total Payable</p>
            <p className="flex justify-center items-center">
              <TbCurrencyTaka /> {calculateTotalPayable()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
