import { useAuth } from "@arcana/auth-react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";

import ProductNFT from "../../artifacts/contracts/ProductNFT.sol/ProductNFT.json";
import { providers, Contract, ethers } from "ethers";
import { arcanaProvider } from "../..";
import { ProductNFTContractAddress } from "../../constants/constants";
import { useNavigate } from "react-router";
import CustomCard from "../CustomCard";
import CustomButton from "../CustomButton";

const ManufacturerBidItem = (props) => {
    // console.log(props);
    const auth = useAuth();
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

    const chooseBid = async (index) => {
        if (!auth.user) return;

        let winnerAddress = "";

        const snapshot = await getDocs(collection(db, "Manufacturer"));
        let docId = "";
        let newData = [];
        snapshot.forEach((doc) => {
            const t = doc.data();

            for (let i = 0; i < t.products.length; i++) {
                if (t.products[i].batchId === props.batchId) {
                    let data = t.products[i];
                    console.log("yyyyyyyy", data);
                    docId = doc.id;
                    newData = t.products;
                    winnerAddress = data.bids[index].walletAddress;
                    newData[i].bids = [];
                    newData[i].itemInTransit = true;
                    newData[i].logistic = false;
                    newData[i].buyer = false;
                    newData[i].buyerWalletAddress = auth.user.address;
                }
            }
        });

        try {
            await arcanaProvider.connect();
            await contract.escrowBatch(props.batchId, winnerAddress);
        } catch (error) {
            console.log(error);
        }

        await updateDoc(doc(db, "Manufacturer", docId), {
            products: newData,
        });
        // console.log(newData);
    };

    return (
        <CustomCard
            styles={{
                margin: "20px 0",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                }}
            >
                <Typography variant="h4">
                    Product Name- {props.productName}
                </Typography>
                <Box display={"flex"} alignItems={"center"} mt={2}>
                    <Typography fontSize={16} textTransform={"uppercase"}>
                        Batch ID- {props.batchId}
                    </Typography>
                    <Typography
                        fontSize={16}
                        ml={2}
                        textTransform={"uppercase"}
                    >
                        Quantity- {props.quantity}
                    </Typography>
                </Box>
                <List
                    sx={{
                        m: 1,
                    }}
                >
                    {props.bids?.map((item, index) => {
                        return (
                            <ListItem
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                    borderRadius: 4,
                                    width: "100%",
                                }}
                            >
                                <ListItemText primary={item.name} />

                                {/* variant="contained" onClick=
                                    {() => chooseBid(index)} */}
                                <CustomButton
                                    text={"Choose Bid"}
                                    onPress={() => {}}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </CustomCard>
    );
};

export default ManufacturerBidItem;
