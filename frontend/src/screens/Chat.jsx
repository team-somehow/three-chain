import { useAuth } from "@arcana/auth-react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";

const Chat = () => {
    const { uid } = useParams();
    const auth = useAuth();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const getData = async () => {
            const snapshot = await getDocs(collection(db, "Chat"));
            let tData = [];
            snapshot.forEach((doc) => {
                if (
                    doc.data().to == auth.user.address ||
                    doc.data().from == auth.user.address
                ) {
                    tData.push(doc.data());
                }
            });
            setData(tData);
        };
        getData();
    }, [auth]);
    const sendMessage = async () => {
        await addDoc(collection(db, "Chat"), {
            content: message,
            to: uid,
            from: auth.user.address,
        });
    };
    return (
        <Box>
            <Typography> Chat</Typography>
            {data.map((item) => {
                return <Typography>{item.content}</Typography>;
            })}
            <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={() => sendMessage()}>Send</Button>
        </Box>
    );
};

export default Chat;
