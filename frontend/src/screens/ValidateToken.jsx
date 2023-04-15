import { Box, Button, TextField } from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../config/firebase";

const ValidateToken = () => {
    const [tokenId, setTokenId] = useState("");
    const [data, setData] = useState({});
    const checkToken = async () => {
        const snapshot = await getDocs(collection(db, "Manufacturer"));
        snapshot.forEach((item) => {
            let t = item.data();
            // console.log(t);
            for (let i = 0; i < t.products.length; i++) {
                if (t.products[i].batchId.toString() == tokenId) {
                    console.log(t.products[i].batchId, tokenId);
                    setData(t.products[i]);
                }
            }
        });
    };
    // useEff

    return (
        <Box>
            <TextField
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
            ></TextField>
            <Button onClick={() => checkToken()}>Check Token</Button>
            {JSON.stringify(data)}
        </Box>
    );
};

export default ValidateToken;
