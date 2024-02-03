// components/PromoCodeList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const PromoCodeList = () => {
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    // Fetch user promo codes from the backend
    const fetchPromoCodes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user-promocode/promo-codes"
        );
        setPromoCodes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPromoCodes();
  }, []);

  return (
    <div>
      <h2>Your Promo Codes</h2>
      <ul>
        {promoCodes.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromoCodeList;
