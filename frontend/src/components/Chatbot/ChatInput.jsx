import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({ onSubmit, placeholder }) {
    const [messageInput, setMessageInput] = useState("");

    return (
        <FormControl
            component={"form"}
            onSubmit={(e) => e.preventDefault()}
            sx={{
                width: "100%",
                background: "#D2D5D6",
                borderRadius: "10px",
            }}
            variant="outlined"
        >
            <InputLabel htmlFor="outlined-adornment-password">
                {placeholder}
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-text"
                type={"text"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            type="submit"
                            aria-label="toggle text visibility"
                            sx={{
                                bgcolor: "#1F4E5F",
                                color: "white",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    color: "#1F4E5F",
                                    bgcolor: "white",
                                },
                            }}
                            onClick={() => {
                                onSubmit(messageInput);
                                setMessageInput("");
                            }}
                            edge="start"
                        >
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                }
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                label="Message"
            />
        </FormControl>
    );
}

export default ChatInput;
