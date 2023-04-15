import React from "react";
import Login from "../components/utils/Login";

const RegulatorLogin = () => {
    return (
        <Login
            heading={"Three Chain Regulator"}
            onLoginNavigateTo={"/regulator"}
        />
    );
};

export default RegulatorLogin;
