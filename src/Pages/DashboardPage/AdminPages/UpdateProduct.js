import React, { useEffect, useState } from "react";
import { Switch, Space } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [shippingCharge, setshippingCharge] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [photo, setPhoto] = useState("");
  const [active, setActive] = useState(true);
  const [id, setId] = useState("");
  const handleToggle = (checked) => {
    setActive(checked);
  };
  console.log(params.id);
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/get-product/${params.id}`
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
        `http://localhost:8080/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/products/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
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
              src={`http://localhost:8080/api/v1/products/product-photo/${params.id}`}
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
      {/* <div className="col-md-9">
      
        <div className="m-1 w-75">
        
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3">
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
              <div className="text-center">
                <img
                  src={`/api/v1/product/product-photo/${id}`}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="write a name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="write a description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="write a Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="write a quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Select
              bordered={false}
              placeholder="Select Shipping "
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "yes" : "No"}>
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleUpdate}>
              UPDATE PRODUCT
            </button>
          </div>
          <div className="mb-3">
            <button className="btn btn-danger" onClick={handleDelete}>
              DELETE PRODUCT
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default UpdateProduct;
