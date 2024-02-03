import React, { useState } from "react";
import { Switch, Space } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [shippingCharge, setshippingCharge] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [photo, setPhoto] = useState("");
  const [active, setActive] = useState(true);
  const navigate = useNavigate();
  const resetForm = () => {
    setName("");
    setDiscount("");
    setPrice("");
    setColor("");
    setSize("");
    setshippingCharge("");
    setShippingMethod("");
    setPhoto("");
    setActive(true);
  };
  const handleToggle = (checked) => {
    setActive(checked);
  };
  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("discount", discount);
      productData.append("price", price);
      productData.append("size", size);
      productData.append("shipping_charge", shippingCharge);
      productData.append("shipping_method", shippingMethod);
      productData.append("photo", photo);
      productData.append("color", color);
      productData.append("active", active);
      //   console.log("hi", productData);
      const { data } = axios.post(
        "http://localhost:8080/api/v1/products/create-product",
        productData
      );
      if (data?.success) {
        console.log("add", data);
        toast.success("Product Created Successfully");
      } else {
        toast.error(data?.response?.data?.error);
        resetForm(); // Reset the form fields
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.log(error.data?.response?.data?.error);
      toast.error("something went wrong");
    }
  };

  return (
    <div
      className="w-[296px] h-[864px] rounded-[15px] mx-auto pt-6 mt-6"
      style={{ boxShadow: "0px 3px 6px #0000001C" }}>
      <div className="w-[232px] h-[175px] bg-[#FFF700] mx-auto rounded-[5px]">
        <label className="w-[232px] h-[175px] bg-[#FFF700] mx-auto rounded-[5px]">
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="product_photo"
              height={"175px"}
              className="h-full w-full object-fill"
            />
          ) : (
            <div className="pt-8">
              {" "}
              <p className="flex flex-col justify-center items-center">
                <span>Upload</span>
                <span>Product Image</span>
              </p>{" "}
              <p className="flex flex-col justify-center items-center text-[12px] font-thin mt-3">
                <span>Image Size Must be</span>
                <span>500*500</span>
              </p>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </div>
          )}
        </label>
      </div>

      <div className="w-[232px] mx-auto mt-4">
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Product Name</p>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Product Price (Before Discount)</p>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>{" "}
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Discount</p>
          </label>
          <input
            type="text"
            name="discount"
            value={discount}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          {" "}
          <label>
            <p className="text-[14px] mb-1">Size</p>
          </label>
          <input
            name="size"
            type="text"
            value={size}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Shipping Method</p>
          </label>
          <input
            type="text"
            name="shipping_method"
            value={shippingMethod}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setShippingMethod(e.target.value)}
          />
        </div>
        <div className="mb-3">
          {" "}
          <label>
            <p className="text-[14px] mb-1">Shipping Charge</p>
          </label>
          <input
            name="shipping_charge"
            type="text"
            value={shippingCharge}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setshippingCharge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>
            <p className="text-[14px] mb-1">Color</p>
          </label>
          <input
            name="color"
            type="text"
            value={color}
            className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-[#E8E8E8] input-[#EFEFEF] w-[232px] h-[35px] rounded-[4px]"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label>
            <p className="text-[14px] mb-1">Active</p>
          </label>
          <Space direction="vertical">
            {/* Custom Switch with "Yes" and "No" labels */}
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              checked={active}
              onChange={handleToggle}
            />
          </Space>
        </div>
      </div>
      <div className="mb-3 flex justify-center items-center">
        <button
          className="bg-[#FFF700] w-[134px] h-[45px] rounded-[23px] mt-6"
          onClick={handleCreate}>
          <p className="text-[14px]"> Add Product</p>
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
