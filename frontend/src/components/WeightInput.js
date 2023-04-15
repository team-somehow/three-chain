import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
function WeightInput({
  placeholder = "Enter Units",
  inputValue,
  setInputValue,
  styles
}) {
  return (
    <FormControl sx={{ my: 1, width: "100%" }} variant="outlined" style={styles}>
      <OutlinedInput
        placeholder={placeholder}
        id="outlined-adornment-weight"
        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
    </FormControl>
  );
}

export default WeightInput;
