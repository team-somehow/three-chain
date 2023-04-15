import { useAuth } from "@arcana/auth-react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";

const ManufacturerBidItem = (props) => {
    // console.log(props);
    const auth = useAuth();
    const chooseBid = async (index) => {
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
                    newData[i].currentLocation = "In Transit";
                }
            }
        });

        await updateDoc(doc(db, "Manufacturer", docId), {
            products: newData,
        });
        // console.log(newData);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 1,
            }}
            component={Paper}
        >
            <Typography variant="h5">Batch ID- {props.batchId}</Typography>
            <Typography variant="h6">
                Product Name- {props.productName}
            </Typography>
            <Typography>Quantity- {props.quantity}</Typography>
            <Box
                sx={{
                    m: 2,
                }}
            >
                {props.bids?.map((item, index) => {
                    return (
                        <Box
                            component={Paper}
                            sx={{
                                m: 1,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography>{item.name}</Typography>
                            <Button onClick={() => chooseBid(index)}>
                                Choose Bid
                            </Button>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ManufacturerBidItem;
