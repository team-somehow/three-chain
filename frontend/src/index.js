import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ProvideAuth } from "@arcana/auth-react";
import { AuthProvider, CHAIN } from "@arcana/auth";
import "./i18next";

const appID = "xar_test_1d6361dc249a49bb64d73a880046f1929b6acd60";

export const arcanaProvider = new AuthProvider(appID, {
    network: "testnet", //defaults to 'testnet'
    position: "right", //defaults to right
    theme: "light", //defaults to dark
    alwaysVisible: true, //defaults to true which is Full UI mode
    chainConfig: {
        chainId: CHAIN.POLYGON_MUMBAI_TESTNET, //defaults to CHAIN.ETHEREUM_MAINNET
        rpcUrl: "https://polygon-rpc.com", //defaults to 'https://rpc.ankr.com/eth'
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ProvideAuth provider={arcanaProvider}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ProvideAuth>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
