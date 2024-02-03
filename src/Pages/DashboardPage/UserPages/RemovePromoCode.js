// components/RemovePromoCode.js

import React, { useState } from "react";
import axios from "axios";

const RemovePromoCode = ({ promoCodeId }) => {
  const handleRemovePromoCode = async () => {
    try {
      // Send a request to remove promo code to the backend
      await axios.delete(
        `http://localhost:8080/api/v1/user-promocode/remove-promo-code/${promoCodeId}`
      );
      // Optionally, update the local state or fetch the updated promo codes
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleRemovePromoCode}>Remove Promo Code</button>
    </div>
  );
};

export default RemovePromoCode;
