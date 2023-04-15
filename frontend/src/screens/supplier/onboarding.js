import { Box, Button } from "@mui/material";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropdown from "../../components/Dropdown";
import WeightInput from "../../components/WeightInput";

function Onboarding() {
  return (
    <Box m={2}>
      <h1>Onboarding</h1>
      <form>
        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          fullWidth
        >
          Upload Aadhar photo
        </Button>
        <Dropdown
          options={["Wheat", "Sugarcane", "Rice", "Cotton", "Maize", "Soybean"]}
        />
        <WeightInput />
        <Box>
          <Button variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Onboarding;
