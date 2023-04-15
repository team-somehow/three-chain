import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Onboarding from "../screens/supplier/onboarding";
import SupplierLogin from "../screens/supplier/SupplierLogin";
import SelectManufacturer from "../screens/supplier/selectManufacturer";

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
        path: "selectManufacturer",
        element: <SelectManufacturer />,
      },
      {
        path: "getLoan",
        element: <h1>Get Loan</h1>,
      },
      {
        path: "loan",
        element: <h1>Supplier Login </h1>,
      },
    ],
  },
]);

export default router;
