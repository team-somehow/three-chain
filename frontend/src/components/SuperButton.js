import { Box, Button } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function SuperButton({ text, onClick = () => {}, icon, styles }) {
  return (
    <Box
      sx={{
        p: "5px",
        background:
          "url('./card-bg.svg'), linear-gradient(131.68deg, rgba(255, 255, 255, 0.6) -3%, rgba(255, 255, 255, 0.6) 113.86%)",
        boxShadow: "0px 4.66667px 4.66667px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(5.83333px)",
        borderRadius: "14px",
        width: "fit-content",
        height: "fit-content",
        ...styles,
      }}
      onClick={() => onClick()}
    >
      <Button
        variant="contained"
        startIcon={icon}
        sx={{
          background: "#FFFFFF",
          boxShadow: "0px 4.66667px 4.66667px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(5.83333px)",
          borderRadius: "10px",
          color: "#2B6E70",
          transition: "all 0.3s ease-in-out",
          fontWeight: "bold",
          "&:hover": {
            background: "#2B6E70",
            boxShadow: "0px 4.66667px 4.66667px rgba(0, 0, 0, 0.25)",
            color: "#FFFFFF",
          },
        }}
      >
        {text}
      </Button>
    </Box>
  );
}

export default SuperButton;
