import React from "react";
import { Box } from "@mui/material";

function CustomCard({ children }) {
  return (
    <Box
      sx={{
        background:
          "url('./card-bg.svg') no-repeat center center/cover !important",
        backdropFilter: "blur(6px)",
        borderRadius: "15px",
        padding: "1rem",
        margin: "1rem",
        overflow: "hidden",
        position: "relative",
        // ...styles,
      }}
    >
      {children}
    </Box>
  );
}

export default CustomCard;
