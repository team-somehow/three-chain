import { useAuth } from "@arcana/auth-react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import BuyerTrackItem from "../../components/buyer/BuyerTrackItem";
import { db } from "../../config/firebase";
import BuyerDashboardNavbar from "../../components/BuyerDashboardNavbar";

const BuyerTrack = () => {
    const [data, setData] = useState([]);
    const auth = useAuth();
    useEffect(() => {
        const getData = async () => {
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            let tData = [];
            snapshot.forEach((doc) => {
                let t = doc.data();
                for (let i = 0; i < t.products.length; i++) {
                    if ("buyer" in t.products[i]) {
                        tData.push(t.products[i]);
                    }
                    let x = t.products[i];
                    for (let j = 0; j < x?.bids?.length; j++) {
                        if (x.bids[i].walletAddress === auth.user.address) {
                            tData.push(t.products[i]);
                        }
                    }
                }
            });
            setData(tData);
        };
        getData();
    }, [auth]);

    return (
        <Box display={"flex"}>
            <BuyerDashboardNavbar />
            <Box m={2}>
                <Typography>Track your orders</Typography>
                {data.map((item) => {
                    return <BuyerTrackItem {...item} />;
                })}
            </Box>
        </Box>
    );
};

export default BuyerTrack;
