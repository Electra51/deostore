// routes.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayouts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Signin from "../Pages/AuthenticationPages/SigninPage/Signin";
import Signup from "../Pages/AuthenticationPages/SignupPage/Signup";
import Home from "../Pages/HomePage/Home";
import UserDashboard from "../Pages/DashboardPage/UserPages/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import OrdersPage from "../Pages/DashboardPage/AdminPages/OrdersPage";
import AdminDashboard from "../Pages/DashboardPage/AdminPages/AdminDashboard";
import AddProducts from "../Pages/DashboardPage/AdminPages/ProductsMenuPage/AddProducts";
import UpdateProduct from "../Pages/DashboardPage/AdminPages/ProductsMenuPage/UpdateProduct";
import CartPage from "../Pages/CartPage/CartPage";
import AddPromoCode from "../Pages/DashboardPage/AdminPages/PromotionMenuAllPage/AddPromoCode";
import UpdatePromoCode from "../Pages/DashboardPage/AdminPages/PromotionMenuAllPage/UpdatePromoCode";
import AddPromoCodesss from "../Pages/DashboardPage/UserPages/AddPromoCodesss";
import OrderPlacedPage from "../Pages/DashboardPage/UserPages/OrderPlacedPage";
import ProductsPage from "../Pages/DashboardPage/AdminPages/ProductsMenuPage/ProductsPage";
import PromoCodes from "../Pages/DashboardPage/AdminPages/PromotionMenuAllPage/PromoCodes";
// import DashboardLayout from "../components/Layouts/DashboardLayout";
// import UserDashboard from "../Pages/DashboardPage/UserPages/UserDashboard";
// import ProfilePage from "../Pages/ProfilePage/ProfilePage";
// import PrivateRoute from "./PrivateRoute";
// import AdminDashboard from "../Pages/DashboardPage/AdminPages/AdminDashboard";
// import AdminRoute from "./AdminRoute";
// import ProductsPage from "../Pages/DashboardPage/AdminPages/ProductsPage";
// import OrdersPage from "../Pages/DashboardPage/AdminPages/OrdersPage";

const routes = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "add", // Fix: Updated path
        element: <AddPromoCodesss />,
      },
      // {
      //   path: "dashboard/user",
      //   element: (
      //     <PrivateRoute>
      //       <UserDashboard />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },

  // // Private routes with authentication check
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "user", // Fix: Updated path
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "orders", // Fix: Updated path
        element: (
          <PrivateRoute>
            <OrderPlacedPage />
          </PrivateRoute>
        ),
      },
      {
        path: "profile", // Fix: Updated path
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },
  // Private routes with authentication check
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),

    children: [
      {
        path: "admin", // Fix: Updated path
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },

      {
        path: "addpromocode", // Fix: Updated path
        element: (
          <AdminRoute>
            <AddPromoCode />
          </AdminRoute>
        ),
      },
      {
        path: "promocode", // Fix: Updated path
        element: (
          <AdminRoute>
            <PromoCodes />
          </AdminRoute>
        ),
      },
      {
        path: "products", // Fix: Updated path
        element: (
          <AdminRoute>
            <ProductsPage />
          </AdminRoute>
        ),
      },
      {
        path: "promocode/:id", // Fix: Updated path
        element: (
          <AdminRoute>
            <UpdatePromoCode />
          </AdminRoute>
        ),
      },
      {
        path: "products/add-products", // Fix: Updated path
        element: (
          <AdminRoute>
            <AddProducts />
          </AdminRoute>
        ),
      },
      {
        path: "products/:id", // Fix: Updated path
        element: (
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        ),
      },
      {
        path: "admin/orders", // Fix: Updated path
        element: (
          <AdminRoute>
            <OrdersPage />
          </AdminRoute>
        ),
      },
      {
        path: "profile", // Fix: Updated path
        element: (
          <AdminRoute>
            <ProfilePage />
          </AdminRoute>
        ),
      },
    ],
  },
  // Authentication routes
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;
