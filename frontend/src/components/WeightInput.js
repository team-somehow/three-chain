import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
function WeightInput() {
  return (
    <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
      <OutlinedInput
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
