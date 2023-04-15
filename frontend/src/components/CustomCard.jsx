import React from "react";
import { Box } from "@mui/material";
import CardBg from "../assets/card-bg.svg";

function CustomCard({ children }) {
  return (
    <Box
      className="customCard"
      sx={{
        background: `linear-gradient(131.68deg, rgba(255, 255, 255, 0.75) -3%, rgba(255, 255, 255, 0.75) 113.86%)`,
        backdropFilter: "blur(6px)",
        borderRadius: "1.5rem",
        padding: "1rem",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        // ...styles,
      }}
    >
      {children}
    </Box>
  );
}

export default CustomCard;
