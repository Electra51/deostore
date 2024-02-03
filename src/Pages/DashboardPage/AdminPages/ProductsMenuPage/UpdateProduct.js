import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Switch, Space } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import SuccessModal from "../../../../components/common/SuccessModal";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [updateProductVisible, setUpdateProductVisible] = useState(false);
  const [shippingCharge, setshippingCharge] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [photo, setPhoto] = useState("");
  const [active, setActive] = useState(true);
  const [id, setId] = useState("");

  const handleToggle = (checked) => {
    setActive(checked);
  };

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${params.id}`
      );
      console.log("data.product.name", data);
      setName(data.product?.name);
      setId(data.product?._id);
      setDiscount(data.product?.discount);
      setPrice(data.product?.price);
      setColor(data.product?.color);
      setSize(data.product?.size);
      setshippingCharge(data.product?.shipping_charge);
      setShippingMethod(data.product?.shipping_method);
      setActive(data.product?.active);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("discount", discount);
      productData.append("price", price);
      productData.append("size", size);
      productData.append("shipping_charge", shippingCharge);
      productData.append("shipping_method", shippingMethod);

      productData.append("color", color);
      productData.append("active", active);
      photo && productData.append("photo", photo);

      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        productData
      );
      setUpdateProductVisible(true);
      setTimeout(() => {
        setUpdateProductVisible(false);
        navigate("/dashboard/products");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are You Sure want to delete this product ? Type yes if you want to delete or type no"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`
      );
      toast.success("This Product Deleted Successfully");
      navigate("/dashboard/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div
      className="w-[296px] h-[864px] rounded-[15px] mx-auto pt-6 mt-6"
      style={{ boxShadow: "0px 3px 6px #0000001C" }}>
      <div className="w-[232px] h-[175px] bg-[#FFF700] mx-auto rounded-[5px]">
        <label className="w-[232px] h-[175px] bg-[#FFF700] mx-auto rounded-[5px]">
          {photo ? (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          ) : (
            <img
              src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${params.id}`}
              alt="product_photo"
              height={"200px"}
              className="h-full w-full object-cover"
            />
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
        </div>
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
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              checked={active}
              onChange={handleToggle}
            />
          </Space>
        </div>
        <div className="mb-3 flex justify-center items-center gap-2">
          <button
            className="bg-[#FFF700] w-[140px] h-[45px] rounded-[23px] mt-6"
            onClick={handleUpdate}>
            <p className="text-[14px]">Update Product</p>
          </button>{" "}
          <MdOutlineDeleteOutline
            onClick={handleDelete}
            className="mt-6 text-4xl bg-[#FFF700] rounded-full p-2 text-red-500 border border-red-500"
          />
        </div>
      </div>
      <SuccessModal
        visible={updateProductVisible}
        setVisible={setUpdateProductVisible}
        title={"Your Products Updated Successfully"}
      />
    </div>
  );
};

export default UpdateProduct;
