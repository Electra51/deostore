import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { menus } from "../common/data";
import { IoIosArrowDown, IoIosArrowDropright } from "react-icons/io";

const SideBar = () => {
  const [auth] = useAuth();
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        onClick={toggleSlider}
        className="fixed lg:hidden z-90 bottom-10 right-10 bg-[#FFF700] w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-[#FFF700] duration-300">
        <IoIosArrowDropright />
      </button>
      <div
        className={`${
          open ? "w-48" : "w-0"
        } lg:w-72 border-0 h-[80vh] border-r border-[#ECECEC] relative duration-500`}>
        <ul className="flex flex-col pt-6 ">
          {menus
            .filter((e) => {
              return (
                (auth?.user?.role === 1 && e.role === 1) ||
                (auth?.user?.role === 0 && e.role === 0)
              );
            })
            .map((item, i) => (
              <React.Fragment key={i}>
                <li className="px-10 py-3">
                  <NavLink
                    to={item.to}
                    className=" flex justify-between items-center">
                    <p> {item.title} </p>
                    {item.subMenu && (
                      <IoIosArrowDown
                        onClick={() => setSubMenuOpen(!subMenuOpen)}
                        className={`${subMenuOpen && "rotate-180"}`}
                      />
                    )}
                  </NavLink>
                </li>
                {item.subMenu && subMenuOpen && (
                  <ul className="pl-10">
                    {item.subMenu.map((subMenuItem, idx) => (
                      <NavLink
                        to={subMenuItem.to}
                        key={idx}
                        className="flex px-5 cursor-pointer text-end py-1">
                        <p>{subMenuItem.title}</p>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
