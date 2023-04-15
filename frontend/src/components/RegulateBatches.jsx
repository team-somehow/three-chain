import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import ProductNFT from "../artifacts/contracts/ProductNFT.sol/ProductNFT.json";
import { providers, Contract, ethers } from "ethers";
import { arcanaProvider } from "..";
import { ProductNFTContractAddress } from "../constants/constants";
import CustomCard from "./CustomCard";

function MyCard(props) {
    const navigate = useNavigate();

    const provider = new providers.Web3Provider(arcanaProvider.provider);
    // get the end user
    const signer = provider.getSigner();
    // get the smart contract
    const contract = new Contract(
        ProductNFTContractAddress,
        ProductNFT.abi,
        signer
    );

    const batchReject = async () => {
        const getData = async () => {
            let tData = [];
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            let docId = "";
            let data = {};
            snapshot.forEach((doc) => {
                const t = doc.data();
                for (let i = 0; i < t.products.length; i++) {
                    if (t.products[i].batchId === props.batchId) {
                        data = t.products;
                        data[i].regulatorVerification = false;
                        data[i].currentLocation="Manufacturer"
                        docId = doc.id;
                    }
                }
            });
            await updateDoc(doc(db, "Manufacturer", docId), {
                products: data,
            });
        };
        getData();
    };
    const batchApprove = async () => {
        try {
            await arcanaProvider.connect();
            await contract.regulatorApproval(props.batchId);
        } catch (error) {
            console.log(error);
        }

        const getData = async () => {
            let tData = [];
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            let docId = "";
            let data = {};
            snapshot.forEach((doc) => {
                const t = doc.data();
                for (let i = 0; i < t.products.length; i++) {
                    if (t.products[i].batchId === props.batchId) {
                        data = t.products;
                        data[i].regulatorVerification = true;
                        docId = doc.id;
                    }
                }
            });
            await updateDoc(doc(db, "Manufacturer", docId), {
                products: data,
            });
        };
        await getData();

        navigate(0);
    };
    return (
        <CustomCard styles={{ width: 600, margin: '1rem auto' }}>
            <CardHeader
                title={props.productName}
                subheader={`Batch ID: ${props.batchId}`}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    Quantity : {props.quantity}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Warehouse: {props.warehouse}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Verification Status: {props.regulatorVerification}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                {/* <Link to={`/chat/${props.batchId}`}>
        <Button aria-label="add to favorites" variant='contained'>
          <ChatIcon /> Chat 
        </Button>
        </Link> */}
                <Button
                    aria-label="share"
                    onClick={batchApprove}
                    variant="contained"
                    color="success"
                    sx={{ ml: 1 }}
                >
                    <CheckCircleIcon /> Approve Batch
                </Button>
                <Button
                    aria-label="share"
                    onClick={batchReject}
                    variant="contained"
                    color="error"
                    sx={{ ml: 1 }}
                >
                    Reject Batch
                </Button>
            </CardActions>
        </CustomCard>
    );
}

export default MyCard;
