import { createBrowserRouter, Outlet } from "react-router-dom";
import Onboarding from "../screens/supplier/onboarding";
import SelectManufacturer from "../screens/supplier/selectManufacturer";
import GetLoan from "../screens/supplier/getLoan";
import Loan from "../screens/supplier/loan";

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
        path: "onboarding",
        element: <Onboarding />,
      },
      {
        path: "selectManufacturer",
        element: <SelectManufacturer />,
      },
      {
        path: "getLoan/:id",
        element: <GetLoan />,
      },
      {
        path: "loan/:id",
        element: <Loan />,
      },
    ],
  },
]);

export default router;
