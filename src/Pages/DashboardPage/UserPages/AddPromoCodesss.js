// components/AddPromoCode.js

import React, { useState } from "react";
import axios from "axios";

const AddPromoCodesss = () => {
  const [promoCode, setPromoCode] = useState("");

  const handleAddPromoCode = async () => {
    try {
      // Send a request to add promo code to the backend
      await axios.post(
        "http://localhost:8080/api/v1/user-promocode/add-promo-code",
        { promoCode }
      );
      // Optionally, update the local state or fetch the updated promo codes
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Promo Code</h2>
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <button onClick={handleAddPromoCode}>Add Promo Code</button>
    </div>
  );
};

export default AddPromoCodesss;
