import { Box, Button, Typography } from "@mui/material";
import React from "react";

const CustomButton = ({
  onPress,
  btnProps,
  styles,
  typographyVariant,
  text,
  icon
}) => {
  return (
    <Button
      onClick={() => onPress()}
      variant="contained"
      sx={{
        borderRadius: "0.5rem",
        backgroundColor: "#2B6E70",
        "&:hover": {
          backgroundColor: "#FFF",
          color: "#2B6E70 !important",
        },
        ...styles,
      }}
      {...btnProps}
    >
      {icon}
      <Typography
        variant={typographyVariant || "body1"}
        sx={{
          color: "inherit",
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default CustomButton;
