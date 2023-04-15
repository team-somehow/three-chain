import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Onboarding from '../screens/supplier/onboarding';
import OnboardingMan from '../screens/manufacturer/OnboardingMan';
import HomeMan from '../screens/manufacturer/HomeMan';
import { Box } from '@mui/material';
import DashboardNavbar from '../components/DashboardNavbar';
import SupplierLogin from '../screens/supplier/SupplierLogin';
import SelectManufacturer from '../screens/supplier/selectManufacturer';
import GetLoan from '../screens/supplier/getLoan';
import Loan from '../screens/supplier/loan';
import SelectSupplier from '../screens/manufacturer/SelectSupplier';
import ApproveLoans from '../screens/manufacturer/ApproveLoans';
import SeeLoans from '../screens/supplier/SeeLoans';
import MyBatches from '../screens/manufacturer/MyBatches';
import CreateBatch from '../components/CreateBatch';
import Regulator from '../screens/Regulator';
import RepayLoan from "../screens/supplier/RepayLoan";

// import Home from "../screens/Home";
// import Login from "../screens/Login";
// import ErrorPage from "../screens/ErrorPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home</h1>,
  },
  {
    path: '/login',
    element: <h1>Login </h1>,
  },
  {
    path: '/supplier',
    children: [
      {
        path: '/supplier/login',
        element: <SupplierLogin />,
      },
      {
        path: '/supplier/login',
        element: <SupplierLogin />,
      },
      {
        path: '/supplier/onboarding',
        element: <Onboarding />,
      },
      {
        path: 'selectManufacturer',
        element: <SelectManufacturer />,
      },
      {
        path: 'getLoan/:id',
        element: <GetLoan />,
      },
      {
        path: 'loan/:id',
        element: <Loan />,
      },
      {
        path: '/supplier/seeLoans',
        element: <SeeLoans />,
      },
    ],
  },
  {
    path: 'manufacturer',
    children: [
      {
        path: 'onboarding',
        element: <OnboardingMan />,
      },
      {
        path: 'dash',
        element: (
          <Box display={'flex'}>
            <DashboardNavbar />
            <Outlet />
          </Box>
        ),
        children: [
          {
            path: "",
            element: <HomeMan />,
          },
          {
            path: "approveLoan",
            element: <ApproveLoans />,
          },
          {
            path: "selectSupplier",
            element: <h1>Supplier Select</h1>,
          },
          {
            path: "creatBatch",
            element: <h1>Supplier Select</h1>,
          },
          {
            path: "batches",
            element: <MyBatches />,
          },
        ],
      },
    ],
  },
  {
    path: '/regulator',
    element: <Regulator />,
  },
]);

export default router;
