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
import OrdersPage from "../Pages/DashboardPage/AdminPages/OrdersMenuPage/OrdersPage";
import AdminDashboard from "../Pages/DashboardPage/AdminPages/AdminDashboard";
import AddProducts from "../Pages/DashboardPage/AdminPages/ProductsMenuPage/AddProducts";
import UpdateProduct from "../Pages/DashboardPage/AdminPages/ProductsMenuPage/UpdateProduct";
import CartPage from "../Pages/CartPage/CartPage";
import AddPromoCode from "../Pages/DashboardPage/AdminPages/PromotionMenuAllPage/AddPromoCode";
import UpdatePromoCode from "../Pages/DashboardPage/AdminPages/PromotionMenuAllPage/UpdatePromoCode";
import OrderPlacedPage from "../Pages/DashboardPage/UserPages/OrderPlacedPage";
import ProductsPage from "../Pages/DashboardPage/AdminPages/ProductsMenuPage/ProductsPage";
import PromoCodes from "../Pages/DashboardPage/AdminPages/PromotionMenuAllPage/PromoCodes";
import AdminPanelLogin from "../Pages/AdminPanelLoginPage/AdminPanelLogin";

const routes = createBrowserRouter([
  // All Public routes
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
    ],
  },

  //userDashboard with Private routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "user",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <OrderPlacedPage />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Admin routes
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),

    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },

      {
        path: "addpromocode",
        element: (
          <AdminRoute>
            <AddPromoCode />
          </AdminRoute>
        ),
      },
      {
        path: "promocode",
        element: (
          <AdminRoute>
            <PromoCodes />
          </AdminRoute>
        ),
      },
      {
        path: "products",
        element: (
          <AdminRoute>
            <ProductsPage />
          </AdminRoute>
        ),
      },
      {
        path: "promocode/:id",
        element: (
          <AdminRoute>
            <UpdatePromoCode />
          </AdminRoute>
        ),
      },
      {
        path: "products/add-products",
        element: (
          <AdminRoute>
            <AddProducts />
          </AdminRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <AdminRoute>
            <OrdersPage />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
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
  {
    path: "/admin-panel",
    element: <AdminPanelLogin />,
  },
]);

export default routes;
