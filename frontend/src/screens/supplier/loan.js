import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import RuppeInput from "../../components/RuppeInput";
import Dropdown from "../../components/Dropdown";

function Loan() {
  const [interest, setInterest] = useState(10);
  const [totalAmount, setTotalAmount] = useState(0);
  return (
    <Box m={2} my={4}>
      <Typography variant="h4">Request with Loan</Typography>
      <form>
        <RuppeInput />
        <Dropdown options={["6 months", "1 year", "2 years"]} />
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Typography variant="h5">Interest: {interest}%</Typography>
        <Typography variant="h5">Total Amount: {totalAmount}</Typography>
        <Button
          variant="contained"
          sx={{
            mt: 4,
          }}
        >
          Request Manufacturer
        </Button>
      </form>
    </Box>
  );
}

export default Loan;
