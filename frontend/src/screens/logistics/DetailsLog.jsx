import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LogDetails from "../../components/LogDetails";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const details = [
    {
        name: "Batch 1",
        id: 1,
        from: "Punjab",
        to: "Mumbai",
        status: 0,
        time: "12:30 PM",
    },
    {
        name: "Batch 2",
        id: 2,
        from: "Goa",
        to: "Delhi",
        status: 2,
        time: "06:30 PM",
    },
    {
        name: "Batch 3",
        id: 3,
        from: "Shimla",
        to: "Delhi",
        status: 1,
        time: "10:00 AM",
    },
];

function DetailsLog() {
    const [data, setData] = useState([]);

    const auth = useAuth();
    useEffect(() => {
        const getData = async () => {
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            let tData = [];
            snapshot.forEach((doc) => {
                let t = doc.data();
                for (let i = 0; i < t.products?.length; i++) {
                    if (
                        t.products[i].itemInTransit === true &&
                        t.products[i].logistic === false
                    ) {
                        tData.push(t.products[i]);
                    }
                }
            });
            console.log(tData);
            setData(tData);
        };
        getData();
    }, [auth]);

    return (
        <Box>
            <Typography
                variant="h4"
                component="h4"
                style={{ margin: "1rem 0" }}
            >
                Get Details
            </Typography>
            {data.map((e) => {
                return <LogDetails {...e} />;
            })}
        </Box>
    );
}

export default DetailsLog;
