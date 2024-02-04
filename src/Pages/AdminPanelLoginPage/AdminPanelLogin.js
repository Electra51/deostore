import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import HelmetHooks from "../../hooks/HelmetHooks";
const AdminPanelLogin = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState({
    phone: "",
    password: "",
  });
  // console.log("location.state", location);
  // useEffect(() => {
  //   const fetchPromoCode = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/v1/promocodes/get-promo-code-user"
  //       );
  //       setPromoCode(response.data.promoCode);
  //       console.log("response.data.promoCode", response.data.promoCode);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPromoCode();
  // }, []);
  // console.log("location.state", location.state);
  const handleSignIn = async (e) => {
    e.preventDefault();

    const data = {
      phone: value.phone,
      password: value.password,
    };
    console.log("data", data);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        data
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res?.data));

        navigate("/dashboard/admin");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <HelmetHooks title={"Admin Login Panel | Deostore"} />

      <div className="flex flex-col justify-center items-center h-[100vh] mx-auto">
        <form
          onSubmit={handleSignIn}
          style={{ boxShadow: "0px 3px 6px #BFBFBF28" }}
          className="w-[271px] rounded-[11px] border mx-auto py-6">
          <div className="relative w-[232px] mx-[20px] lg:mx-auto mt-3">
            <p className="font-medium text-[14px] mb-1">Phone Number</p>
            <input
              name="phone"
              type="number"
              value={value.phone}
              onChange={(e) => {
                setValue((prev) => ({ ...prev, phone: e.target.value }));
              }}
              className="input w-full h-[35px] input-bordered border-[#E8E8E8] rounded-[4px]"
              required
            />
          </div>
          <div className="relative w-[232px] mx-[20px] lg:mx-auto mt-3">
            <p className="font-medium text-[14px] mb-1">Password</p>
            <input
              name="phone"
              type="password"
              value={value.password}
              onChange={(e) => {
                setValue((prev) => ({ ...prev, password: e.target.value }));
              }}
              className="input w-full h-[35px] input-bordered border-[#E8E8E8] rounded-[4px]"
              required
            />
          </div>
          <button
            className="bg-[#FFF700] w-[114px] h-[35px] cursor-pointer mx-[20px] lg:mx-auto flex justify-center items-center my-6 rounded-[17px] border border-[#E8E8E8]"
            type="submit">
            <p className=" text-[#1A1A1A] text-[14px]"> Sign In</p>
          </button>
        </form>
        <div className="w-[271px] h-[161px] border rounded-[11px] px-5 py-4 mt-10">
          <p className="font-medium text-[14px]">
            Use following credentials to login
          </p>
          <p className="mt-2">Phone Number</p>
          <p>123</p>
          <p>Password</p>
          <p>r@g.com</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelLogin;
