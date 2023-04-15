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
import { useTranslation } from "react-i18next";

function Onboarding() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const changeLanguage = () => i18n.changeLanguage("en");
    useEffect(() => {
        i18n.changeLanguage("en");
    }, []);
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
        <>
            <h1 className="text-center text-4xl pt-6 font-black text-white">
                Lets Onboard you!
            </h1>
            <Box
                width={"100%"}
                height={"90vh"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box
                    sx={{
                        background:
                            "linear-gradient(131.68deg, rgba(255, 255, 255, 0.75) -3%, rgba(255, 255, 255, 0.75) 113.86%)",
                        boxShadow:
                            "0px 4.66667px 4.66667px rgba(0, 0, 0, 0.25)",
                        backdropFilter: "blur(5.83333px)",
                        borderRadius: "15px",
                        padding: "1rem",
                        margin: "1rem",
                        overflow: "hidden",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        height: "70vh",
                    }}
                >
                    <Typography
                        variant="h4"
                        mb={10}
                        textAlign="center"
                        fontWeight="600"
                    >
                        Kindly fill in the below details
                    </Typography>
                    <Box
                        component={"form"}
                        display={"flex"}
                        flexDirection={"column"}
                        width={"80%"}
                    >
                        {/* <input
                        onChange={(e) => setImage(e.target.files)}
                        ref={imageUploadRef}
                        type="file"
                        style={{ display: "none" }}
                    /> */}
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
                            styles={{ marginBottom: "1.5rem" }}
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
                            styles={{ marginTop: "2rem" }}
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
                            styles={{ margin: "2rem" }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Onboarding;
