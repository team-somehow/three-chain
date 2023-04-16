import * as React from "react";
import Typography from "@mui/material/Typography";
import RegulateBatches from "../../src/components/RegulateBatches";
import Center from "../components/utils/Center";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router";

const suppliers = [
    {
        name: "Pargat Singh",
        id: 1,
        quantity: 100,
        status: 0,
    },
    {
        name: "Vinay Kanse",
        id: 2,
        quantity: 1000,
        status: 1,
    },
];

function Regulator() {
    const navigate = useNavigate();

    const [data, setData] = React.useState([]);
    useEffect(() => {
        const getData = async () => {
            let tData = [];
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            snapshot.forEach((doc) => {
                const t = doc.data();
                for (let i = 0; i < t.products.length; i++) {
                    if (t.products[i].regulatorVerification !== true) {
                        tData.push(t.products[i]);
                    }
                }
            });
            setData(tData);
        };
        getData();
    }, []);

    return (
        <Center height="auto">
            <Typography
                variant="h3"
                component="h3"
                style={{ margin: "1rem 0" }}
            >
                Batches to be approved
            </Typography>
            {data.map((e) => {
                return <RegulateBatches {...e} />;
            })}
        </Center>
    );
}

export default Regulator;
