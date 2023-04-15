import React, { useState } from "react";
import Center from "../../components/utils/Center";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropdown from "../../components/Dropdown";
import WeightInput from "../../components/WeightInput";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const grains = [
  { label: "Sugar", id: 1 },
  { label: "Wheat", id: 2 },
  { label: "Rice", id: 3 },
  { label: "Corn", id: 4 },
  { label: "Oats", id: 5 },
  { label: "Barley", id: 6 },
  { label: "Rye", id: 7 },
  { label: "Millet", id: 8 },
];

function OnboardingMan() {
  const selectProductOptions = [
    "Wheat",
    "Sugarcane",
    "Rice",
    "Cotton",
    "Maize",
    "Soybean",
  ];
  const [selectedProduct, setSelectedProduct] = useState(
    selectProductOptions[0]
  );
  return (
    <Box m={2}>
      <h1 style={{ textAlign: "center" }}>Supplier Onboarding</h1>
      <form style={{ margin: "20vh auto" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          fullWidth
        >
          Upload Aadhar photo
        </Button>
        <Dropdown
          label={"Select the product"}
          inputValue={selectedProduct}
          setInputValue={setSelectedProduct}
          options={selectProductOptions}
        />
        <WeightInput placeholder="Enter the Units Expected" />
        <Box>
          <Link to="/manufacturer/dash/home">
            <Button
              variant="contained"
              fullWidth
              onClick={() => console.log("Submitted Form")}
            >
              Submit
            </Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
}

export default OnboardingMan;
