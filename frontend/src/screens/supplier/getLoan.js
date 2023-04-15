import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function GetLoan() {
  const supplierId = useParams().id;
  const [isNo, setIsNo] = useState(false);

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} m={4}>
      <Typography variant="h4">Want Loan</Typography>
      <Link
        to={"/supplier/loan/" + supplierId}
        style={{
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            my: 2,
          }}
          fullWidth
        >
          YES
        </Button>
      </Link>
      <Button variant="contained" fullWidth onClick={() => setIsNo(true)}>
        NO
      </Button>
      {isNo && (
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 6,
          }}
        >
          Request Manufacturer
        </Button>
      )}
    </Box>
  );
}

export default GetLoan;
