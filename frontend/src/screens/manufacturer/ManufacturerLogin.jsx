import React from "react";
import Login from "../../components/utils/Login";

const ManufacturerLogin = () => {
    return (
        <Login
            heading={"Three Chain Manufacturer"}
            onLoginNavigateTo={"/manufacturer/onboarding"}
        />
    );
};

export default ManufacturerLogin;
