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
import CustomCard from "../CustomCard";
import CustomButton from "../CustomButton";

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
    console.log(props.itemReached);

    if (props.itemReached && props.itemInTransit) {
        return (
            <CustomCard
                styles={{
                    margin: "20px 0",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="h4">
                        Name- {props.productName}
                    </Typography>
                    <Typography>
                        Current status- Waiting for confirmation
                    </Typography>
                </Box>
            </CustomCard>
        );
    }

    if (props.itemReached) {
        return (
            <CustomCard
                styles={{
                    margin: "20px 0",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="h4">
                        Name- {props.productName}
                    </Typography>
                    <Typography>
                        Current status- Item successfully reached
                    </Typography>
                </Box>
            </CustomCard>
        );
    }
    if (props.itemInTransit) {
        return (
            <CustomCard
                styles={{
                    margin: "20px 0",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="h4">
                        Name- {props.productName}
                    </Typography>
                    <Typography>Current status- item in transit</Typography>
                </Box>
                <CustomButton
                    text={"Item reached"}
                    onPress={() => itemReached()}
                ></CustomButton>
            </CustomCard>
        );
    }

    return (
        <Box component={Paper}>
            <Typography>{props.productName}</Typography>
        </Box>
    );
};

export default BuyerTrackItem;
