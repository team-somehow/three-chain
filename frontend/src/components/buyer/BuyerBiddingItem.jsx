import { useAuth } from "@arcana/auth-react";
import {
    Box,
    Button,
    Divider,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router";

import { providers, Contract, ethers } from "ethers";
import { arcanaProvider } from "../..";
import { ProductNFTContractAddress } from "../../constants/constants";
import ProductNFTAbi from "../../artifacts/contracts/ProductNFT.sol/ProductNFT.json";
import CustomCard from "../CustomCard";

const BuyerBiddingItem = (props) => {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(
        ProductNFTContractAddress,
        ProductNFTAbi.abi,
        signer
    );

    // console.log(props);
    const auth = useAuth();

    const navigate = useNavigate();

    const [amount, setAmount] = React.useState(0);

    const placeBid = async () => {
        const getData = async () => {
            // take these values
            const amt = ethers.utils.parseUnits(amount.toString(), 18);

            try {
                await arcanaProvider.connect();
                await contract.escrowBid(props.batchId, {
                    value: amt,
                });
            } catch (error) {
                console.log(error);
            }

            const snapshot = await getDocs(collection(db, "Manufacturer"));
            let docId = "";
            let data = {};
            snapshot.forEach((doc) => {
                const t = doc.data();
                for (let i = 0; i < t.products.length; i++) {
                    if (t.products[i].batchId === props.batchId) {
                        docId = doc.id;
                        data = t.products;
                        if (data[i].bids?.length) {
                            data[i].bids.push({
                                name: auth.user.name,
                                amount: amount,
                                walletAddress: auth.user.address,
                            });
                        } else {
                            data[i].bids = [
                                {
                                    name: auth.user.name,
                                    amount: amount,
                                    walletAddress: auth.user.address,
                                },
                            ];
                        }
                        console.log(data[i]);
                    }
                }
            });
            console.log("yoooooo", data);
            await updateDoc(doc(db, "Manufacturer", docId), {
                products: data,
                
            });
        };
        await getData();

        navigate(0);
    };
    return (
        <CustomCard
            styles={{
                margin: "20px 0",
            }}
        >
            <Box>
                <Typography variant="h5">{props.productName}</Typography>
            </Box>
            <Divider style={{ margin: 10, marginBottom: 20 }} />
            <Box
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Box className="mr-10">
                    <Typography>
                        Quantity{" --- "}
                        {props.quantity}
                    </Typography>
                    <Typography>
                        Current Location{" --- "}
                        {props.warehouse}
                    </Typography>
                    <Typography>
                        Price per Item{" --- "}
                        {amount / props.quantity}
                    </Typography>
                    <Typography>
                        Batch Id{" --- "} {props.batchId}
                    </Typography>
                </Box>
                <Box display={"flex"} flexDirection="column">
                    <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        style={{ marginBottom: 20 }}
                    />
                    <Button onClick={() => placeBid()} variant="contained">
                        Place Bid for the Batch
                    </Button>
                </Box>
            </Box>
        </CustomCard>
    );
};

export default BuyerBiddingItem;
