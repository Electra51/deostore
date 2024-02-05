import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <PrimeReactProvider>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <App />
          <ToastContainer />
        </CartProvider>{" "}
      </SearchProvider>
    </AuthProvider>
  </PrimeReactProvider>
  // </React.StrictMode>
);

reportWebVitals();
