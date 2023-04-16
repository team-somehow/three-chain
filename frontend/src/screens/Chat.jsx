import { useAuth } from "@arcana/auth-react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import Center from "../components/utils/Center";
import CustomCard from "../components/CustomCard";
import CustomButton from "../components/CustomButton";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import CustomAppBar from "../components/AppBar";

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

    const address = "0x37ED61F8CD09261Aea1622af723Ce01Da9e93471";
    return (
        <Box width={"100%"} height={"100vh"}>
            <CustomAppBar
                onBackUrl={"/supplier/selectManufacturer"}
                title={"Chat"}
            />
            <Box
                sx={{
                    height: "calc(100vh - 100px)",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CustomCard
                    styles={{
                        width: "80%",
                        height: "80%",
                        boxShadow:
                            "12px 12px 80px #a6a6a6, -12px -12px 80px #ffffff",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        textAlign="center"
                    >
                        Chat
                    </Typography>
                    <Divider sx={{ margin: "2rem 0", width: "100%" }} />
                    {data.map((item) => {
                        return (
                            <Box sx={{ width: "100%", my: 1 }}>
                                <Typography
                                    sx={{
                                        float:
                                            item.to !== auth.user.address
                                                ? "right"
                                                : "left",
                                        backgroundColor:
                                            item.to !== auth.user.address
                                                ? "green"
                                                : "blue",
                                        textAlign:
                                            item.to !== auth.user.address
                                                ? "right"
                                                : "left",
                                        padding: "0.5rem 2.5rem",
                                        borderRadius: "2rem",
                                        color: "white",
                                        fontWeight: "500",
                                    }}
                                >
                                    {item.content}
                                </Typography>
                            </Box>
                        );
                    })}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "0",
                            marginBottom: "1rem",
                            width: "90%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type here..."
                            sx={{ width: "75%", height: "auto" }}
                        />
                        <CustomButton
                            onPress={() => sendMessage()}
                            text="Send"
                            styles={{
                                width: "30%",
                                marginLeft: "0.5rem",
                                height: "auto",
                            }}
                            icon={<SendIcon sx={{ marginRight: "0.5rem" }} />}
                        />
                    </Box>
                </CustomCard>
            </Box>
        </Box>
    );
};

export default Chat;
