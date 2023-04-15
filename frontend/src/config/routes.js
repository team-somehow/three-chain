import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Onboarding from "../screens/supplier/onboarding";
import SupplierLogin from "../screens/supplier/SupplierLogin";

// import Home from "../screens/Home";
// import Login from "../screens/Login";
// import ErrorPage from "../screens/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/login",
    element: <h1>Login </h1>,
  },
  {
    path: "/supplier",
    children: [
      {
        path: "/supplier/login",
        element: <SupplierLogin />,
      },
      {
        path: "/supplier/onboarding",
        element: <Onboarding />,
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
