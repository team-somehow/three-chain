import React, { useState } from "react";
import CustomCard from "../components/CustomCard";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import ChatInput from "../components/Chatbot/ChatInput";
import Message from "../components/Chatbot/Message";
import { Chatbot as ChatbotApi } from "../config/Chatbot";
function Chatbot() {
    const [chats, setChats] = useState([
        {
            isUser: false,
            message: "Hello User! How may i help you?",
            timestamp: "1hr ago",
        },
    ]);
    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            my={4}
            width={"100%"}
            height={"100vh"}
        >
            <CustomCard
                styles={{
                    width: "86%",
                    height: "80%",
                    margin: "auto",
                }}
            >
                <Typography variant="h4" ml={2}>
                    Chatbot
                </Typography>
                <Box width={"100%"} p={1} height={"60vh"} overflow={"auto"}>
                    <List>
                        {chats.map((chat) => (
                            <Message
                                isUser={chat.isUser}
                                message={chat.message}
                                timestamp={chat.timestamp}
                            />
                        ))}
                    </List>
                </Box>
                <Box width={"100%"} p={1}>
                    <ChatInput
                        onSubmit={(message) => {
                            setChats([
                                ...chats,
                                {
                                    isUser: true,
                                    message: message,
                                    timestamp: "just now",
                                },
                            ]);
                            ChatbotApi(message).then((response) => {
                                setChats([
                                    ...chats,
                                    {
                                        isUser: true,
                                        message: message,
                                        timestamp: "just now",
                                    },
                                    {
                                        message: response,
                                        isUser: false,
                                        timestamp: "just now",
                                    },
                                ]);
                            });
                        }}
                        placeholder="Message"
                    />
                </Box>
            </CustomCard>
        </Box>
    );
}

export default Chatbot;
