import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayouts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <p>hello</p>,
      },
    ],
  },
]);

export default router;
