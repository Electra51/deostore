import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayouts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Signin from "../Pages/AuthenticationPages/SigninPage/Signin";
import Signup from "../Pages/AuthenticationPages/SignupPage/Signup";
import Home from "../Pages/HomePage/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
