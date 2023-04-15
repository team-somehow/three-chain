import React, { useState } from "react";
import { Typography, Card, TextField, Button } from "@mui/material";
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "@arcana/auth-react";
// import crypto from "crypto";

import ProductNFT from "../../artifacts/contracts/ProductNFT.sol/ProductNFT.json";
import { providers, Contract, ethers } from "ethers";
import { ProductNFTContractAddress } from "../../constants/constants";
import { arcanaProvider } from "../..";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";

function CreateBatch() {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    // get the end user
    const signer = provider.getSigner();
    // get the smart contract
    const contract = new Contract(
        ProductNFTContractAddress,
        ProductNFT.abi,
        signer
    );
    const navigate = useNavigate();

    const [batch, setBatch] = useState({
        name: "",
        quantity: "",
        price: "",
        warehouse: "",
    });

    const auth = useAuth();
    function handleChange(e) {
        const { name, value } = e.target;
        setBatch((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    async function handleSubmit() {
        const batchUid = getRandomInt(999999999999);
        console.log("0", auth.user.address);

        try {
            await arcanaProvider.connect();
            await contract.batchMint(batch.quantity, batch.name, batchUid);
        } catch (error) {
            console.log(error);
        }

        console.log("1", auth.user.address);
        const q = query(
            collection(db, "Manufacturer"),
            where("uid", "==", auth.user.address)
        );
        const snapshot = await getDocs(q);
        let data;
        let index = 0;
        snapshot.forEach((doc) => {
            if (index === 0) {
                data = { id: doc.id, ...doc.data() };
            }
            index++;
        });
        await updateDoc(doc(db, "Manufacturer", data.id), {
            products: arrayUnion({
                productName: batch.name,
                quantity: batch.quantity,
                warehouse: batch.warehouse,
                price: batch.price,
                regulatorVerification: false,
                batchId: batchUid,
                currentLocation: "Regulator",
            }),
        });
        console.log("done");
        navigate(0);
    }

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
                Create Batch
            </Typography>
            <CustomCard
                styles={{
                    width: "80%",
                    height: "100%",
                    marginTop: "3rem",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TextField
                    name="name"
                    sx={{ my: 2 }}
                    id="outlined-basic"
                    label="Product Name"
                    variant="outlined"
                    value={batch.name}
                    onChange={handleChange}
                />
                <TextField
                    name="quantity"
                    sx={{ my: 2 }}
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    value={batch.quantity}
                    onChange={handleChange}
                />
                <TextField
                    name="price"
                    sx={{ my: 2 }}
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    value={batch.price}
                    onChange={handleChange}
                />
                <TextField
                    name="warehouse"
                    sx={{ my: 2 }}
                    id="outlined-basic"
                    label="Warehouse Name"
                    variant="outlined"
                    value={batch.warehouse}
                    onChange={handleChange}
                />
                <CustomButton
                    text={"Submit"}
                    onPress={() => {
                        handleSubmit();
                    }}
                    styles={{ width: "100%", margin: "0.5rem auto" }}
                >
                    Create Batch
                </CustomButton>
            </CustomCard>
        </div>
    );
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default CreateBatch;
