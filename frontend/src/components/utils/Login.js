import { Auth, useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginNavigateTo, heading }) => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        console.log("auth in Login.js", auth);
        if (auth.isLoggedIn) {
            navigate(onLoginNavigateTo);
        }
    }, [auth, navigate, onLoginNavigateTo]);

    return (
        <div className="bg min-h-screen">
            <h1 className="text-center text-4xl p-8 font-black text-white">
                {heading}
            </h1>
            {auth.loading ? (
                <div className="loading mt-40">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <Auth
                        externalWallet={false}
                        theme="dark"
                        onLogin={() => {
                            navigate(onLoginNavigateTo);
                        }}
                    ></Auth>
                </div>
            )}
        </div>
    );
};

export default Login;
