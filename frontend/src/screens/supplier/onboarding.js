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
import { useNavigate } from "react-router";
function Onboarding() {
    const navigate = useNavigate();

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

        navigate("/supplier/selectManufacturer");
        setLoading(false);
    };

    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Box
                sx={{
                    background: `url('${CardBg}') no-repeat center center !important`,
                    backdropFilter: "blur(6px)",
                    borderRadius: "15px",
                    padding: "1rem",
                    margin: "1rem",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Typography variant="h4" mb={10}>
                    Onboarding
                </Typography>
                <Box
                    component={"form"}
                    display={"flex"}
                    flexDirection={"column"}
                >
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
            </Box>
        </Box>
    );
}

export default Onboarding;
