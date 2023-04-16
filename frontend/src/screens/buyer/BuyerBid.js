import { useAuth } from "@arcana/auth-react";
import { Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import BuyerBiddingItem from "../../components/buyer/BuyerBiddingItem";
import { db } from "../../config/firebase";
import BuyerDashboardNavbar from "../../components/BuyerDashboardNavbar";

const BuyerBid = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!auth.user) return;

        const getData = async () => {
            let tData = [];
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            snapshot.forEach((doc) => {
                const t = doc.data();
                for (let i = 0; i < t.products.length; i++) {
                    if (t.products[i].regulatorVerification) {
                        console.log(t.products[i]?.bids);
                        console.log(t.products[i]);

                        let obj = t.products[i]?.bids?.find(
                            (o) => o.walletAddress === auth.user.address
                        );

                        if (!obj) {
                            tData.push(t.products[i]);
                        }
                    }
                }
            });

            console.log("tData", tData);

            setData(tData);
        };
        getData();
    }, [auth]);

    return (
        <Box display={"flex"}>
            <BuyerDashboardNavbar />
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
                <Typography variant="h4" align="center">
                    Bid for Items
                </Typography>
                {data.map((item) => {
                    return (
                        <BuyerBiddingItem
                            key={JSON.stringify(item)}
                            {...item}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default BuyerBid;
