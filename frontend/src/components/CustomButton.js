import { Box, Button, Typography } from "@mui/material";
import React from "react";

const CustomButton = ({
  onPress,
  btnProps,
  styles,
  typographyVariant,
  text,
}) => {
  return (
    <Button
      onClick={() => onPress()}
      variant="contained"
      sx={{
        borderRadius: "16px",
        backgroundColor: "#2B6E70",
        "&:hover": {
          backgroundColor: "#FFF",
          color: "#2B6E70 !important",
        },
        ...styles,
      }}
      {...btnProps}
    >
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
