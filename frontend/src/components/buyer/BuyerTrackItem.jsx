import { Box, Button, Paper, Typography } from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";

const BuyerTrackItem = (props) => {
    // console.log(props);

    const itemReached = async () => {
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
    };

    if (props?.itemReached) {
        return (
            <Box component={Paper}>
                <Typography>{props.productName}</Typography>
                <Typography>Item successfully reached</Typography>
            </Box>
        );
    }

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
