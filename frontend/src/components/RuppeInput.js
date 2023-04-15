import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { InputLabel, OutlinedInput } from "@mui/material";

function RuppeInput() {
  return (
    <FormControl
      fullWidth
      sx={{
        my: 2,
      }}
    >
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        type="number"
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
        label="Amount"
      />
    </FormControl>
  );
}

export default RuppeInput;
