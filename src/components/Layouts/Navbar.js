import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
import navLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { MdLogout } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import profileImg from "../../assets/woman.png";
import { toast } from "react-toastify";
import { useSearch } from "../../context/search";
import { useCart } from "../../context/cart";
const Navbar = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };
  const { searchQuery, updateSearchQuery } = useSearch();
  console.log("Search Query in Navbar:", searchQuery);

  const handleInputChange = (e) => {
    updateSearchQuery(e.target.value);
  };
  const items = (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          value={searchQuery}
          className="input placeholder:text-[#CBCBCB] placeholder:text-[14px] border-0 rounded-none border-b border-b-[#CBCBCB] input-[#EFEFEF] w-[220px] md:w-[270px] lg:w-[450px] h-[50px] px-6"
        />
        <IoSearchOutline className="text-[#999999] text-xl absolute right-[-95px] md:right-6 lg:left-0 top-3.5" />
      </div>
    </>
  );
  return (
    <div className="border-b border-[#ECECEC]">
      <div className="navbar bg-base-100 max-w-[1366px] h-20 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <IoMenuOutline className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {items}
            </ul>
          </div>
          <Link
            to="/"
            className="flex justify-center items-center gap-[2px] lg:gap-2">
            <img
              src={navLogo}
              alt=""
              className="w-[50px] lg:w-[90px] h-[40px] lg:h-[70px]"
            />{" "}
            <h1 className="mt-2 text-[19px] lg:text-[25px] font-bold">
              Deo<span className="text-[#fcee26]">St</span>ore
            </h1>
          </Link>
        </div>

        <div className="navbar-end gap-6">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{items}</ul>
          </div>
          <Link
            to="/cart"
            className="hidden lg:flex justify-center items-center gap-3 hover:bg-base-200 rounded-full cursor-pointer px-2 py-1">
            <RiShoppingCartLine className="w-[30px] h-[30px]" />{" "}
            <h2 className="text-xl text-[#2B2B2B] font-semibold">Cart</h2>
            <h2 className="h-[22px] w-[22px] rounded-full bg-[#FCEE26] flex justify-center items-center text-[14px]">
              {cart?.length}
            </h2>
          </Link>
          <div tabIndex={0} role="button" className="lg:hidden">
            <div className="indicator">
              <RiShoppingCartLine className="w-[24px] h-[24px]" />

              <span className="badge badge-sm indicator-item bg-[#FCEE26]">
                8
              </span>
            </div>
          </div>
          {!auth.user ? (
            <>
              <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-10 rounded-full">
                    <LuUser2 className="h-[36px] w-[26px] text-xl" />
                  </div>
                </div>
                <Link
                  to="/signin"
                  tabIndex={0}
                  className="dropdown-content mt-12 z-[1] p-2 shadow border bg-base-100 border-[#fcee26] rounded-md w-52">
                  <h1 className="py-2 bg-[#fcee26] !hover:bg-[#fcee26] rounded-md flex justify-center items-center gap-1 cursor-pointer">
                    <MdOutlineAccountCircle className="text-xl" />
                    Sign In/ Sign Up
                  </h1>
                </Link>
              </div>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Profile image" src={profileImg} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content mt-1 bg-base-100 z-[1] p-2 shadow border  border-[#fcee26] rounded-md w-52">
                <Link
                  to={`/dashboard/profile`}
                  className="py-2 bg-[#fcee26] !hover:bg-[#fcee26] rounded-md flex justify-start items-center gap-1 pl-10 cursor-pointer">
                  <MdOutlineAccountCircle className="text-xl" />
                  Profile
                </Link>
                <Link
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="py-2 bg-[#fcee26] !hover:bg-[#fcee26] rounded-md flex justify-start items-center gap-1 pl-10 cursor-pointer mt-3">
                  <BiSolidDashboard className="text-xl" />
                  Dashboard
                </Link>
                <h1
                  className="py-2 bg-[#fcee26] !hover:bg-[#fcee26] rounded-md flex justify-start items-center gap-1 pl-10 cursor-pointer mt-3"
                  onClick={handleLogout}>
                  <MdLogout className="text-xl" />
                  Logout
                </h1>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
