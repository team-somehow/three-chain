import { Box, Button, Paper, Typography } from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";

import ProductNFT from "../../artifacts/contracts/ProductNFT.sol/ProductNFT.json";
import { providers, Contract, ethers } from "ethers";
import { arcanaProvider } from "../..";
import { ProductNFTContractAddress } from "../../constants/constants";
import { useAuth } from "@arcana/auth-react";
import { useNavigate } from "react-router";

const BuyerTrackItem = (props) => {
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

    const navigate = useNavigate();

    const itemReached = async () => {
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
                    newData[i].buyer = true;
                    newData[i].itemInTransit = !(true && props.logistic);
                    newData[i].itemReached = true;
                    if (newData[i].itemInTransit) {
                        newData[i].currentLocation = "In Transit";
                    } else {
                        newData[i].currentLocation = "Buyer";
                    }
                }
            }
        });

        await updateDoc(doc(db, "Manufacturer", docId), {
            products: newData,
        });
        console.log("true");

        try {
            await arcanaProvider.connect();
            await contract.escrowEndBuyer(props.batchId);
            // navigate(0);
        } catch (error) {
            console.log(error);
        }

        navigate(0);
    };
    console.log(props.itemInTransit);

    if (props.itemInTransit) {
        return (
            <Box
                component={Paper}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Typography>{props.productName}</Typography>
                <Typography>item in transit</Typography>
                <Button variant="contained" onClick={() => itemReached()}>
                    Item reached
                </Button>
            </Box>
        );
    }

    if (props?.itemReached) {
        return (
            <Box component={Paper}>
                <Typography>{props.productName}</Typography>
                <Typography>Item successfully reached</Typography>
            </Box>
        );
    }
    if (!props.buyer && !props.logistic) {
        return <Box></Box>;
    }

    return (
        <Box component={Paper}>
            <Typography>{props.productName}</Typography>
        </Box>
    );
};

export default BuyerTrackItem;
