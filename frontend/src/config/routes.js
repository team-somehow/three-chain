import { Box } from "@mui/system";
import { createBrowserRouter, Outlet } from "react-router-dom";
// import Home from "../screens/Home";
// import Login from "../screens/Login";
// import ErrorPage from "../screens/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <h1>Home</h1>,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    exact: true,
    element: <h1>Login </h1>,
  },
  {
    path: "/supplier",
    exact: true,
    children: [
      {
        path: "/supplier/onboarding",
        element: <h1>Onboarding</h1>,
      },
      {
        path: "/supplier/selectManufacturer",
        element: <h1>Select Manufacturer</h1>,
      },
      {
        path: "/supplier/getLoan",
        element: <h1>Get Loan</h1>,
      },
      {
        path: "/supplier/loan",
        element: <h1>Supplier Login </h1>,
      },
    ],
  },
]);

export default router;
