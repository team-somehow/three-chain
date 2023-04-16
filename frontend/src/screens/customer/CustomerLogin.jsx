import React from "react";
import Login from "../../components/utils/Login";

const CustomerLogin = () => {
    return (
        <Login
            heading={"Three Chain Customer"}
            onLoginNavigateTo={"/validateToken"}
        />
    );
};

export default CustomerLogin;
