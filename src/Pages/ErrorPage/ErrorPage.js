import React from "react";
import { MdArrowBack } from "react-icons/md";
// import ErrorImage from "../../assets/errorPage.png";
const ErrorPage = () => {
  return (
    <div className="max-w-[350px] md:max-w-[750px] lg:max-w-[1210px] mx-auto mt-20">
      <div className="relative">
        {" "}
        <div className="md:w-[538px] lg:w-[738px] md:h-[416px] lg:h-[616px]">
          {/* <img src={ErrorImage} alt="" className="h-full w-full object-fill" /> */}
        </div>
        <div className="md:ml-auto lg:ml-auto absolute top-60 md:top-52 lg:top-52 left-0 md:right-0 lg:right-0 w-[350px] md:w-[500px] lg:w-[500px]">
          {" "}
          <h1 className="text-[190px] md:text-[250px] lg:text-[250px] font-black text-[#FA6410] hover:text-paragraphColor">
            404
          </h1>
          <h1 className="text-center lg:text-start md:text-start text-2xl md:text-[35px] lg:text-[35px] font-normal w-[520px absolute bottom-24 right-0">
            We are sorry, but the page you requested was not found
          </h1>
          <button className="border rounded-[14px] px-[40px] lg:px-[40px] py-[20px] lg:py-[20px] flex justify-center items-center gap-1 bg-[#FA6410] text-white hover:bg-paragraphColor hover:text-white mt-8 text-xl mx-auto lg:mx-0">
            <MdArrowBack />
            <p className="text-[18px] font-semibold">Back to home</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
