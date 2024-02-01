import React from "react";
import { Helmet } from "react-helmet";

const HelmetHooks = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={"MERN Stack E-commerce Website"} />
      <meta name="keywords" content={"ReactJs,NodeJs,ExpressJs,Mongodb"} />
      <meta name="author" content={"Safayet Nur"} />
    </Helmet>
  );
};

export default HelmetHooks;
