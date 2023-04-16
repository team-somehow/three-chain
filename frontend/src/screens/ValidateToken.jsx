import {
    Box,
    Button,
    Dialog,
    Divider,
    Modal,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Html5Qrcode } from "html5-qrcode";
import CustomCard from "../components/CustomCard";
import sha256 from "sha256";
import { useNavigate } from "react-router-dom";

const ValidateToken = () => {
    const [tokenId, setTokenId] = useState("");
    const [data, setData] = useState({});
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();

    // useEff
    useEffect(() => {
        if (!check) {
            const html5QrCode = new Html5Qrcode("reader");
            const config = { qrbox: { width: 200, height: 300 } };
            html5QrCode.start(
                { facingMode: "environment" },
                config,
                onScanSuccess
            );
            window.onbeforeunload = async function () {
                await html5QrCode.stop();
            };
        }
    }, [check]);

    const onScanSuccess = (qrCodeMessage) => {
        console.log(`QR matched = ${qrCodeMessage}`);
        setTokenId(qrCodeMessage);
        navigate(`${qrCodeMessage}`);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div
                id="reader"
                style={{
                    height: "300px",
                    width: "300px",
                    overflow: "hidden",
                }}
            ></div>
            <TextField
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
            >
                Or Enter Token ID
            </TextField>
            <Button onClick={() => navigate(`${tokenId}`)}>
                Check Token
            </Button>
        </Box>
    );
};

export default ValidateToken;
