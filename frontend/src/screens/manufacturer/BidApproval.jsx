import { Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ManufacturerBidItem from "../../components/manufacturer/ManufacturerBidItem";
import { db } from "../../config/firebase";

const BidApproval = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            let tData = [];
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            snapshot.forEach((doc) => {
                const t = doc.data();
                for (let i = 0; i < t.products.length; i++) {
                    if (t.products[i].regulatorVerification) {
                        tData.push(t.products[i]);
                    }
                }
            });
            setData(tData);
        };
        getData();
    }, []);

    return (
        <Box
            sx={{
                p: 5,
                width: "100%",
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "column",
            }}
        >
            <Typography variant="h4">Bid Approval</Typography>
            {data.map((item) => (
                <ManufacturerBidItem {...item} />
            ))}
        </Box>
    );
};

export default BidApproval;
