import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropdown from "../../components/Dropdown";
import WeightInput from "../../components/WeightInput";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

function Onboarding() {
  const [loading, setLoading] = useState(true);

  const onSubmit = async () => {
    setLoading(true);

    const data = {
      name: "Rajesh",
      phone: "1234567890",
      aadhar: "123456789012",
      address: "123, ABC Street, XYZ City, 123456",
      crop: "Wheat",
    };

    await addDoc(collection(db, "suppliers"), data);

    setLoading(false);
  };

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
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              onSubmit();
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Onboarding;
