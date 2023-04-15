import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import MyCard from "../../components/MyCard";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const suppliers = [
    {
        name: "Supplier 1",
        id: 1,
        aadhar: "9945 2454 1434 3532",
        tenure: "6 months",
        interest: "5%",
        product: "Rice",
        quantity: 100,
        price: 10,
        request: "Some request",
        expanded: false,
    },
    {
        name: "Supplier 2",
        id: 2,
        aadhar: "5955 3254 6434 8532",
        tenure: "12 months",
        interest: "10%",
        product: "wheat",
        quantity: 1000,
        price: 5,
        request: "Other request",
        expanded: false,
    },
];

function ApproveLoans() {
    const [data, setData] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        const getData = async () => {
            const q = query(
                collection(db, "RequestedLoans"),
                where("loanStatus", "==", "Requested"),
                where("manufacturerId", "==", auth?.user.address)
            );
            const snapshot = await getDocs(q);
            // console.log(snapshot);
            let tData = [];
            snapshot.forEach((item) => {
                console.log(item.id, " => ", item.data());
                tData.push({ id: item.id, ...item.data() });
            });
            setData(tData);
            console.log(tData);
            //   setData(suppliers); //! Only for testing
        };
        getData();
    }, [auth]);

    return (
        <div
            style={{
                paddingLeft: 20,
            }}
        >
            <Typography
                variant="h4"
                component="h4"
                style={{ margin: "1rem 0" }}
                fontWeight="600"
            >
                Approve Loans
            </Typography>
            {data.map((e) => {
                return <MyCard {...e} />;
            })}
        </div>
    );
}

export default ApproveLoans;
