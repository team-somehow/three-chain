import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RuppeInput from "../../components/RuppeInput";
import Dropdown from "../../components/Dropdown";

function Loan() {
  const durationOptions = ["6 months", "1 year", "2 years"];
  const [interest, setInterest] = useState(10);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);
  const [loanAmount, setLoanAmount] = useState(0);

  return (
    <Box m={2} my={4}>
      <Typography variant="h4">Request with Loan</Typography>
      <form>
        <RuppeInput input={loanAmount} setInput={setLoanAmount} />
        <Dropdown
          label={"Duration"}
          options={durationOptions}
          inputValue={selectedDuration}
          setInputValue={setSelectedDuration}
        />
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
