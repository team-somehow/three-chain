import React from "react";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
function Message({ message, timestamp, isUser }) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {isUser ? (
                        <PersonIcon />
                    ) : (
                        <img
                            src="./bot.png"
                            width={"100%"}
                            height="100%"
                            alt="Avatar"
                        />
                    )}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={message} secondary={timestamp} />
        </ListItem>
    );
}

export default Message;
