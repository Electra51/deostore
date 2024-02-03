// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import { menus } from "../common/data";

// const SideBar = () => {
//   const [auth, setAuth] = useAuth();
//   const [open, setOpen] = useState(false);

//   const toggleSlider = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       <button
//         onClick={toggleSlider}
//         className="fixed lg:hidden z-90 bottom-10 right-10 bg-teal-800 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-teal-800 duration-300">
//         hi
//       </button>
//       <div
//         className={`${
//           open ? "w-48" : "w-0"
//         } lg:w-72 border-0 h-[100vh] border-r border-[#ECECEC] relative duration-500`}>
//         <ul className="flex flex-col pt-6 ">
//           {menus
//             .filter((e) => {
//               // Filter menu items based on user's role
//               return auth?.user?.role === 1 && e.role === 1;
//             })
//             .map((e, i) => (
//               <NavLink key={i} to={e.to} className="">
//                 <li className="px-10 py-3">{e.title}</li>
//               </NavLink>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { menus } from "../common/data";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = () => {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!open);
  };

  // const toggleSubMenu = (index) => {
  //   setOpenSubMenu((prevIndex) => (prevIndex === index ? null : index));
  // };

  return (
    <div>
      <button
        onClick={toggleSlider}
        className="fixed lg:hidden z-90 bottom-10 right-10 bg-teal-800 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-teal-800 duration-300">
        hi
      </button>
      <div
        className={`${
          open ? "w-48" : "w-0"
        } lg:w-72 border-0 h-[100vh] border-r border-[#ECECEC] relative duration-500`}>
        <ul className="flex flex-col pt-6 ">
          {menus
            .filter((e) => {
              // Filter menu items based on user's role
              return (
                (auth?.user?.role === 1 && e.role === 1) || // Admin
                (auth?.user?.role === 0 && e.role === 0) // User
              );
            })
            .map((item, i) => (
              <React.Fragment key={i}>
                <li className="px-10 py-3">
                  <NavLink
                    to={item.to}
                    className="flex justify-between items-center">
                    {item.title}{" "}
                    {item.subMenu && (
                      <IoIosArrowDown
                        onClick={() => setSubMenuOpen(!subMenuOpen)}
                        className={`${subMenuOpen && "rotate-180"}`}
                      />
                    )}
                  </NavLink>
                </li>
                {item.subMenu && subMenuOpen && (
                  <ul>
                    {item.subMenu.map((subMenuItem, idx) => (
                      <li
                        key={idx}
                        className="flex px-5 cursor-pointer text-center text-sm text-gray-200 py-1">
                        <NavLink
                          to={subMenuItem.to}
                          className="flex justify-between items-center">
                          {subMenuItem.title}
                        </NavLink>{" "}
                      </li>
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
