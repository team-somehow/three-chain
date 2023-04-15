import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["Wheat", "Sugarcane", "Rice", "Cotton", "Maize", "Soybean"];
export default function MultiValueDropdown({
    label = "",
    inputValue,
    setInputValue,
    options = options,
}) {
    const [value, setValue] = React.useState(options[0]);
    // const [inputValue, setInputValue] = React.useState("");

    return (
        <div>
            <br />
            <Autocomplete
                multiple
                id="tags-outlined"
                options={options}
                defaultValue={[options[0]]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="filterSelectedOptions"
                        placeholder={label}
                    />
                )}
                value={inputValue}
                onChange={(e, value) => setInputValue(value)}
            />
        </div>
    );
}
