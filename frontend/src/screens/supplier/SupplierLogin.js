import React from "react";
import Login from "../../components/utils/Login";

const SupplierLogin = () => {
    return (
        <Login
            heading={"Three Chain Supplier"}
            onLoginNavigateTo={"/supplier/onboarding"}
        />
    );
};

export default SupplierLogin;
