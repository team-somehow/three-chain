import {
    FormControl,
    FormHelperText,
    InputAdornment,
    OutlinedInput,
} from "@mui/material";
import React from "react";
function WeightInput({
    placeholder = "Capacity",
    inputValue,
    setInputValue,
    styles,
}) {
    return (
        <FormControl
            sx={{ my: 1, width: "100%" }}
            variant="outlined"
            style={styles}
        >
            <label>Capacity: </label>
            <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                    <InputAdornment position="end">units</InputAdornment>
                }
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
