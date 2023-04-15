import React from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
import Onboarding from "../screens/supplier/onboarding";
import OnboardingMan from "../screens/manufacturer/OnboardingMan";
import HomeMan from "../screens/manufacturer/HomeMan";
import { Box } from "@mui/material";
import DashboardNavbar from "../components/DashboardNavbar";
import SupplierLogin from "../screens/supplier/SupplierLogin";
import SelectManufacturer from "../screens/supplier/selectManufacturer";
import GetLoan from "../screens/supplier/getLoan";
import Loan from "../screens/supplier/loan";
import SelectSupplier from "../screens/manufacturer/SelectSupplier";
import ApproveLoans from "../screens/manufacturer/ApproveLoans";
import SeeLoans from "../screens/supplier/SeeLoans";
import MyBatches from "../screens/manufacturer/MyBatches";
import CreateBatch from "../screens/manufacturer/CreateBatch";
import Regulator from "../screens/Regulator";
import RepayLoan from "../screens/supplier/RepayLoan";
import LogisticsNavbar from "../components/LogisticsNav";
import HomeLog from "../screens/logistics/HomeLog";
import DetailsLog from "../screens/logistics/DetailsLog";
import BuyerHome from "../screens/buyer/BuyerHome";
import BuyerBid from "../screens/buyer/BuyerBid";
import BidApproval from "../screens/manufacturer/BidApproval";
import BuyerTrack from "../screens/buyer/BuyerTrack";
import Home from "../screens/supplier/Home";
import Login from "../screens/Login/Login";
import CustomAppBar from "../components/AppBar";
import ManufacturerLogin from "../screens/manufacturer/ManufacturerLogin";
import LogisticsLogin from "../screens/logistics/LogisticsLogin";
import RegulatorLogin from "../screens/RegulatorLogin";
import Chat from "../screens/Chat";
import BuyerLogin from "../screens/buyer/BuyerLogin.jsx";
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
        element: <Login />,
    },
    {
        path: "/supplier",
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
                path: "/supplier/onboarding",
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
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "repay/:id",
                element: <RepayLoan />,
            },
            {
                path: "/supplier/seeLoans",
                element: <SeeLoans />,
            },
        ],
    },
    {
        path: "manufacturer",
        children: [
            {
                path: "login",
                element: <ManufacturerLogin />,
            },
            {
                path: "onboarding",
                element: <OnboardingMan />,
            },
            {
                path: "dash",
                element: (
                    <Box display={"flex"}>
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
                        path: "createBatch",
                        element: <CreateBatch />,
                    },
                    {
                        path: "batches",
                        element: <MyBatches />,
                    },
                    {
                        path: "bidApproval",
                        element: <BidApproval />,
                    },
                ],
            },
        ],
    },
    {
        path: "/regulator",
        element: <Regulator />,
    },
    {
        path: "/buyer",
        children: [
            {
                path: "login",
                element: <BuyerLogin />,
            },
            {
                path: "",
                element: <BuyerHome />,
            },
            {
                path: "placeBid",
                element: <BuyerBid />,
            },
            {
                path: "buyerTrack",
                element: <BuyerTrack />,
            },
        ],
    },
    {
        path: "logistics/login",
        element: <LogisticsLogin />,
    },
    {
        path: "/logistics",
        element: (
            <Box display={"flex"}>
                <LogisticsNavbar />
                <Outlet />
            </Box>
        ),
        children: [
            {
                path: "",
                element: <HomeLog />,
            },
            {
                path: "details",
                element: <DetailsLog />,
            },
        ],
    },
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
            // {
            // 	path: "getLoan/:id",
            // 	element: <GetLoan />,
            // },
            {
                path: "loan/:id",
                element: <Loan />,
            },
            {
                path: "repay/:id",
                element: <RepayLoan />,
            },
            {
                path: "/supplier/seeLoans",
                element: <SeeLoans />,
            },
        ],
    },
    {
        path: "manufacturer",
        children: [
            {
                path: "onboarding",
                element: <OnboardingMan />,
            },
            {
                path: "dash",
                element: (
                    <Box display={"flex"}>
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
                        path: "createBatch",
                        element: <CreateBatch />,
                    },
                    {
                        path: "batches",
                        element: <MyBatches />,
                    },
                    {
                        path: "bidApproval",
                        element: <BidApproval />,
                    },
                ],
            },
        ],
    },
    {
        path: "/regulator",
        children: [
            {
                path: "",
                element: <Regulator />,
            },
            {
                path: "login",
                element: <RegulatorLogin />,
            },
        ],
    },
    {
        path: "/buyer",
        children: [
            {
                path: "",
                element: <BuyerHome />,
            },
            {
                path: "placeBid",
                element: <BuyerBid />,
            },
            {
                path: "buyerTrack",
                element: <BuyerTrack />,
            },
        ],
    },
    {
        path: "/logistics",
        element: (
            <Box display={"flex"}>
                <LogisticsNavbar />
                <Outlet />
            </Box>
        ),
        children: [
            {
                path: "",
                element: <HomeLog />,
            },
            {
                path: "details",
                element: <DetailsLog />,
            },
        ],
    },
    {
        path: "/Chat/:uid",
        element: <Chat />,
    },
]);

export default router;
