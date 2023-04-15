import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function CustomAppBar({ title, onBackUrl }) {
    const navigate = useNavigate();
    return (
        <Box position="static" sx={{bgcolor : '#1f4e5f', py: 1}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 , color : 'white'}}
                    onClick={() => navigate(onBackUrl)}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} fontWeight="700" className="text-white">
                    {title}
                </Typography>
            </Toolbar>
        </Box>
    );
}

export default CustomAppBar;
