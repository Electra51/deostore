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
import ProductsPage from "../Pages/DashboardPage/AdminPages/ProductsPage";
import AdminDashboard from "../Pages/DashboardPage/AdminPages/AdminDashboard";
import AddProducts from "../Pages/DashboardPage/AdminPages/AddProducts";
import UpdateProduct from "../Pages/DashboardPage/AdminPages/UpdateProduct";
import CartPage from "../Pages/CartPage/CartPage";
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
        path: "products", // Fix: Updated path
        element: (
          <AdminRoute>
            <ProductsPage />
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
        path: "orders", // Fix: Updated path
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
