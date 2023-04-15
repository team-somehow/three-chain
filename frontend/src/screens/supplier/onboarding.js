import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropdown from "../../components/Dropdown";
import WeightInput from "../../components/WeightInput";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import CardBg from "../../assets/card-bg.svg";
import SuperButton from "../../components/SuperButton";
import CustomButton from "../../components/CustomButton";
import CustomCard from "../../components/CustomCard";
function Onboarding() {
  const sellingProducts = [
    "Wheat",
    "Sugarcane",
    "Rice",
    "Cotton",
    "Maize",
    "Soybean",
  ];
  const [loading, setLoading] = useState(true);
  const [selectedSellingProduct, setSelectedSellingProduct] = useState(
    sellingProducts[0]
  );
  const [image, setImage] = useState(null);
  const [sellingUnits, setSetSellingUnits] = useState(0);
  const imageUploadRef = useRef();
  useEffect(() => {
    console.log(image);
  }, [image]);

  const onSubmit = async () => {
    setLoading(true);
    const data = {
      name: "Rajesh",
      role: "supplier",
      phone: "1234567890",
      aadhar: "123456789012",
      address: "123, ABC Street, XYZ City, 123456",
      crop: selectedSellingProduct,
      sellingUnits: sellingUnits,
    };
    await addDoc(collection(db, "suppliers"), data);
    setLoading(false);
  };

  return (
    <Box
      width={"100%"}
      height={"100vh"}
      m={2}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CustomCard>
        <Typography variant="h4" mb={4}>
          Onboarding
        </Typography>
        <Box component={"form"} display={"flex"} flexDirection={"column"}>
          <input
            onChange={(e) => setImage(e.target.files)}
            ref={imageUploadRef}
            type="file"
            style={{ display: "none" }}
          />
          {/* <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={() => imageUploadRef.current.click()}
          fullWidth
        >
          Upload Aadhar photo
        </Button> */}
          <SuperButton
            icon={<CloudUploadIcon />}
            text={"Upload Aadhar Photo"}
            onClick={() => imageUploadRef.current.click()}
            styles={{}}
          />
          <Dropdown
            label={"What do you sell?"}
            setInputValue={setSelectedSellingProduct}
            inputValue={selectedSellingProduct}
            options={sellingProducts}
          />
          <WeightInput
            inputValue={sellingUnits}
            setInputValue={setSetSellingUnits}
          />
          {/* <Button
              variant="contained"
              fullWidth
              onClick={() => {
                onSubmit();
              }}
            >
              Submit
            </Button> */}
          <CustomButton
            text={"Submit"}
            onPress={() => {
              onSubmit();
            }}
          />
        </Box>
      </CustomCard>
    </Box>
  );
}

export default Onboarding;
