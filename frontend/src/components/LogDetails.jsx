import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import ProductNFT from "../artifacts/contracts/ProductNFT.sol/ProductNFT.json";
import { providers, Contract, ethers } from "ethers";
import { arcanaProvider } from "..";
import { ProductNFTContractAddress } from "../constants/constants";
import { useAuth } from "@arcana/auth-react";
import CustomCard from "./CustomCard";

function LogDetails(props) {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    // get the end user
    const signer = provider.getSigner();
    // get the smart contract
    const contract = new Contract(
        ProductNFTContractAddress,
        ProductNFT.abi,
        signer
    );

    const auth = useAuth();

    function pickupOrder() {
        console.log("pickup order");
    }

    function deliverOrder() {
        console.log("deliver order");
    }

    const steps = ["Manufacturer", "Regulator", "Logistics", "Buyer"];

    const trackStatus = ["In Transit", "On Shelf", "Customer"];
    const status = () => {
        if (props.currentLocation === "Manufacturer") return 0;
        else if (props.currentLocation === "Regulator") return 1;
        else if (props.currentLocation === "Logistic") return 2;
        else return 3;
    };
    function MyStepper() {
        return (
            <Box sx={{ width: "100%", p: 3 }}>
                <Stepper activeStep={status()} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        );
    }
    const onOrderDelivered = async () => {
        if (!auth.user) return;

        const snapshot = await getDocs(collection(db, "Manufacturer"));
        let docId = "";
        let newData = [];
        snapshot.forEach((doc) => {
            const t = doc.data();
            for (let i = 0; i < t.products.length; i++) {
                if (t.products[i].batchId === props.batchId) {
                    docId = doc.id;
                    newData = t.products;
                    newData[i].logistic = true;
                    newData[i].itemInTransit = !(true && props.buyer);
                    newData[i].itemReached = true;
                    newData[i].buyerDT = new Date().toLocaleString();
                }
            }
        });

        try {
            await arcanaProvider.connect();
            await contract.escrowEndLogistics(props.batchId);
        } catch (error) {
            console.log(error);
        }

        await updateDoc(doc(db, "Manufacturer", docId), {
            products: newData,
        });
        console.log("true");
    };

    return (
        <CustomCard styles={{ width: 600, marginBottom: 2 }}>
            {/* <CardHeader title={props.productName} subheader={props.batchId} /> */}
            <CardContent>
                <Typography variant="h4">Name- {props.productName}</Typography>
                <Typography variant="body1">
                    Batch ID- {props.batchId}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        my: 2,
                    }}
                >
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="From"
                        defaultValue={"Mumbai"}
                        sx={{ marginRight: "2rem" }}
                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="To"
                        defaultValue={"Goa"}
                    />
                </Box>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    style={{ textAlign: "center", margin: "1rem 0" }}
                >
                    Track
                    <MyStepper />
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Last Updated Status : {"12:30PM"}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button
                    aria-label="share"
                    onClick={deliverOrder}
                    variant="contained"
                    // color="success"
                    sx={{ ml: 1 }}
                    // disabled={status === 1 ? false : true}
                    onClick={() => onOrderDelivered()}
                >
                    <CheckCircleIcon /> Order Delivered
                </Button>
            </CardActions>
        </CustomCard>
    );
}

export default LogDetails;
