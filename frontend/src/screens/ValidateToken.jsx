import {
    Box,
    Button,
    Dialog,
    Divider,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Html5Qrcode } from "html5-qrcode";
import CustomCard from "../components/CustomCard";

const ValidateToken = () => {
    const [tokenId, setTokenId] = useState("");
    const [data, setData] = useState({});
    const [check, setCheck] = useState(false);
    const [open, setOpen] = useState(false);

    const checkToken = async () => {
        const snapshot = await getDocs(collection(db, "Manufacturer"));
        snapshot.forEach((item) => {
            let t = item.data();
            // console.log(t);
            for (let i = 0; i < t.products.length; i++) {
                if (t.products[i].batchId.toString() == tokenId) {
                    console.log(t.products[i].batchId, tokenId);
                    setData(t.products[i]);
                }
            }
        });
        setCheck(true);
    };
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
    });

    const onScanSuccess = (qrCodeMessage) => {
        console.log(`QR matched = ${qrCodeMessage}`);
        setTokenId(qrCodeMessage);
        setCheck(true);
    };
    if (!check) {
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
                <Button onClick={() => checkToken()}>Check Token</Button>
            </Box>
        );
    } else {
        return (
            <>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <Box
                        component={Paper}
                        sx={{
                            width: "80vw",
                            p:4
                        }}
                    >
                        <Typography>Successfully Reported the Item</Typography>
                    </Box>
                </Dialog>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100vh",
                        gap: 2,
                        mx: 3,
                    }}
                >
                    <CustomCard styles={{ m: 2 }}>
                        <Typography variant="h5">Regulator ID</Typography>
                        <Typography>
                            0x37ED61F8CD09261Aea1622af723Ce01Da9e93471
                        </Typography>
                        <Typography>Arriving Data- 16th April 2023</Typography>
                    </CustomCard>
                    <CustomCard>
                        <Typography variant="h5">Current Location</Typography>
                        <Typography>Stage: {data.currentLocation}</Typography>
                        <Typography>
                            0x9ef7A9fC0f33785338Af3586420743a95B9a8d65
                        </Typography>
                    </CustomCard>
                    <CustomCard>
                        <Typography variant="h5">Product BatchId</Typography>
                        <Typography> {data.batchId}</Typography>
                    </CustomCard>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        fullWidth
                    >
                        {" "}
                        Report Issue
                    </Button>
                </Box>
            </>
        );
    }
};

export default ValidateToken;
