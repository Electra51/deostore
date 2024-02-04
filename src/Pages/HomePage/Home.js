import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearch } from "../../context/search";
import { useCart } from "../../context/cart";

const Home = () => {
  const [cart, setCart] = useCart();
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [searchQuery, products]);

  //Get products function
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [searchQuery]);

  const addToCart = (product) => {
    const isProductInCart = cart.some((item) => item._id === product._id);

    if (!isProductInCart) {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Item added to cart");
    } else {
      toast.warning("Item is already in the cart");
    }
  };

  //product price depending on discount
  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return 0;
    const discountedAmount = (price * discount) / 100;
    return price - discountedAmount;
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-8 max-w-screen-xl mx-auto mt-10">
        {filteredProducts
          ?.filter((product) => product.active)
          .map((product, i) => (
            <div key={i} className="group relative overflow-hidden">
              <Link
                to={`/dashboard/products/${product._id}`}
                className="block w-[225px] h-[337px] p-4 bg-[#FFFFFF] rounded-[10px] transition duration-300 transform scale-100 hover:scale-105 border border-[#8A8A8A19] pb-4"
                style={{ boxShadow: "0px 0px 3px #8A8A8A19" }}>
                <div className="w-full h-3/5 overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product?._id}`}
                    alt="product image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full mt-2">
                  <p className="text-base font-semibold text-gray-800">
                    {product?.name}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-lg text-gray-700">
                      BDT.{" "}
                      {calculateDiscountedPrice(
                        product?.price,
                        product?.discount
                      ).toFixed(2)}
                    </p>
                    <p className="w-1/4 p-1 text-sm bg-[#FFEE00] rounded text-center">
                      {product?.discount}%
                    </p>
                  </div>
                </div>
              </Link>
              <div className="absolute inset-0 bg-white rounded-[10px] w-[225px] h-[337px] border opacity-0 hover:opacity-50 transition duration-300 group-hover:opacity-100"></div>
              <button
                className="absolute bottom-1/2 left-[38%] transform -translate-x-1/2 bg-[#FFEE00] px-4 py-2 rounded-[23px] opacity-0 transition duration-300 group-hover:opacity-100"
                onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
