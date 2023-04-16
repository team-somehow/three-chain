import { createBrowserRouter, Outlet } from 'react-router-dom';
import Onboarding from '../screens/supplier/onboarding';
import OnboardingMan from '../screens/manufacturer/OnboardingMan';
import HomeMan from '../screens/manufacturer/HomeMan';
import { Box } from '@mui/material';
import DashboardNavbar from '../components/DashboardNavbar';
import SupplierLogin from '../screens/supplier/SupplierLogin';
import SelectManufacturer from '../screens/supplier/selectManufacturer';

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
        path: "/supplier/login",
        element: <SupplierLogin />,
      },
      {
        path: "/supplier/login",
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
        path: 'getLoan',
        element: <h1>Get Loan</h1>,
      },
      {
        path: 'loan',
        element: <h1>Supplier Login </h1>,
      },
    ],
  },
  {
    path: 'manufacturer',
    exact: true,
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
            path: 'home',
            element: <HomeMan />,
          },
          {
            path: 'approveLoan',
            element: <h1>Approve Loan</h1>,
          },
          {
            path: 'selectSupplier',
            element: <h1>Supplier Select</h1>,
          },
          {
            path: 'creatBatch',
            element: <h1>Supplier Select</h1>,
          },
          {
            path: 'batches',
            element: <h1>My Batches</h1>,
          },
        ],
      },
    ],
  },
]);

export default router;
