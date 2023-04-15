import React from "react";
import Login from "../../components/utils/Login";

function LogisticsLogin() {
    return (
        <Login
            heading={"Three Chain Logistics"}
            onLoginNavigateTo={"/logistics/onboarding"}
        />
    );
}

export default LogisticsLogin;
