import * as React from "react";
import Typography from "@mui/material/Typography";
import Batches from "../../components/Batches";
import { useEffect, useState } from "react";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import Center from "../../components/utils/Center";

const suppliers = [
    {
        batchId: 925251700490,
        currentLocation: "Regulator",
        price: "1",
        productName: "Rice",
        quantity: "10",
        regulatorVerification: false,
        warehouse: "Mumbai",
    },
    {
        batchId: 925251700490,
        currentLocation: "Regulator",
        price: "1",
        productName: "Rice",
        quantity: "10",
        regulatorVerification: false,
        warehouse: "Mumbai",
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
        <div
            style={{
                height: "100%",
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="h4"
                style={{ margin: "2rem 0" }}
                fontWeight="600"
            >
                My Batchs
            </Typography>
            {data.map((e) => {
                return <Batches {...e} />;
            })}
        </div>
    );
}

export default MyBatches;
