import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
function WeightInput({placeholder = "Enter Units"}) {
  return (
    <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
      <OutlinedInput
        placeholder={placeholder}
        id="outlined-adornment-weight"
        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
      />
      {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
    </FormControl>
  );
}

export default WeightInput;
