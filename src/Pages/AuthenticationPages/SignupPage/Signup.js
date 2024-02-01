import React, { useState } from "react";
import HelmetHooks from "../../../hooks/HelmetHooks";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleSignUp = async (e) => {
    e.preventDefault();

    const data = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      password: value.password,
    };
    console.log("data", data);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        data
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <HelmetHooks title={"Signup | Deostore"} />
      <div className="flex justify-center items-center h-[100vh] mx-auto">
        <form
          onSubmit={handleSignUp}
          style={{ boxShadow: "0px 3px 6px #BFBFBF28" }}
          className="w-[271px] rounded-[11px] border mx-auto py-6">
          <div className="relative w-[232px] mx-[20px] lg:mx-auto mt-3">
            <p className="font-medium text-[14px] mb-1">Name</p>
            <input
              name="name"
              type="text"
              value={value.name}
              onChange={(e) => {
                setValue((prev) => ({ ...prev, name: e.target.value }));
              }}
              className="input w-full h-[35px] input-bordered border-[#E8E8E8] rounded-[4px]"
              required
            />
          </div>
          <div className="relative w-[232px] mx-[20px] lg:mx-auto mt-3">
            <p className="font-medium text-[14px] mb-1">Email</p>
            <input
              name="Email"
              type="text"
              value={value.email}
              onChange={(e) => {
                setValue((prev) => ({ ...prev, email: e.target.value }));
              }}
              className="input w-full h-[35px] input-bordered border-[#E8E8E8] rounded-[4px]"
              required
            />
          </div>
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
            <p className=" text-[#1A1A1A] text-[14px]"> Sign Up</p>
          </button>
          <Link to="/signin" className="text-center mt-10">
            <p className="text-[14px]">
              Already has Account?{" "}
              <span className="text-blue-500 underline">SignIn</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
