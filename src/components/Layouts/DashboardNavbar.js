import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import navLogo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { MdLogout } from "react-icons/md";
import profileImg from "../../assets/woman.png";
import { toast } from "react-toastify";
const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  console.log(auth?.user?.name);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/signin");
    toast.success("logout successfully");
  };

  return (
    <div className="border-b border-[#ECECEC]">
      <div className="navbar h-20 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <IoMenuOutline className="text-2xl" />
            </div>
          </div>
          <Link
            to="/"
            className="flex justify-center items-center gap-[2px] lg:gap-1">
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
          {auth.user && (
            <div className="dropdown dropdown-end">
              <div className="flex justify-center items-center gap-1">
                <p className="text-[16px]">{auth?.user?.name}</p>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Profile image" src={profileImg} />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content mt-1 bg-base-100 z-[1] p-2 shadow border  border-[#fcee26] rounded-md w-52">
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

export default DashboardNavbar;
