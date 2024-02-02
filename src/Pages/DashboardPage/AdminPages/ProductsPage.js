import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/products/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <Link to="add-products">
        {" "}
        <button
          className="w-[189px] h-[45px] mt-[30px] ml-[55px] rounded-[23px]"
          style={{ boxShadow: "0px 3px 6px #8A8A8A19" }}>
          <p className="text-[#1A1A1A] text-[14px]">Add New Product</p>
        </button>
      </Link>

      <div className="grid grid-cols-4 gap-[42px] max-w-6xl mx-auto mt-10">
        {products?.map((product, i) => {
          console.log(product);
          return (
            <Link
              to={`/dashboard/products/${product._id}`}
              key={i}
              className="w-[225px] h-[337px] flex flex-col justify-center items-center rounded-[10px] hover:bg-base-200"
              style={{ boxShadow: "0px 0px 3px #8A8A8A19" }}>
              <div className="w-[192px] h-[210px]">
                <img
                  // src=""
                  src={`http://localhost:8080/api/v1/products/product-photo/${product?._id}`}
                  alt="product image"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-[192px] h-[51px] mt-[18px]">
                <p>{product?.name}</p>
              </div>
              <div className="w-[192px] flex justify-between items-center">
                <p className="text-[18px] text-[#2B2B2B]">
                  BDT. {product?.price}
                </p>
                <p className="h-[25px] w-[47px] bg-[#FFEE00] rounded flex justify-center items-center">
                  {product?.discount}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
