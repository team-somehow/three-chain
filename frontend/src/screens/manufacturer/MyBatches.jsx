import * as React from "react";
import Typography from "@mui/material/Typography";
import Batches from "../../components/Batches";
import { useEffect, useState } from "react";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const suppliers = [
    {
        name: "Batch 1",
        id: 1,
        quantity: 100,
        status: 0,
    },
    {
        name: "Batch 2",
        id: 2,
        quantity: 1000,
        status: 1,
    },
];

function MyBatches() {
    const [data, setData] = useState([]);
    const auth = useAuth();
    useEffect(() => {
        if (!auth.user) return;

        const getData = async () => {
            const q = query(
                collection(db, "Manufacturer"),
                where("uid", "==", auth.user.address)
            );
            const snapshot = await getDocs(q);
            let tData = [];
            let index = 0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                tData.push(...data.products);
            });
            console.log(tData);
            setData(tData);
        };
        getData();
    }, [auth]);

    return (
        <div style={{ paddingLeft: 20 }}>
            <Typography
                variant="h4"
                component="h4"
                style={{ margin: "1rem 0" }}
            >
                My Batches
            </Typography>
            {data.map((e) => {
                return <Batches {...e} />;
            })}
        </div>
    );
}

export default MyBatches;
