import React, { useEffect, useState } from "react";
import Center from "../../components/utils/Center";
import { Button, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropdown from "../../components/Dropdown";
import WeightInput from "../../components/WeightInput";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "@arcana/auth-react";
import CustomCard from "../../components/CustomCard";
import SuperButton from "../../components/SuperButton";
import CustomButton from "../../components/CustomButton";
import MultiValueDropdown from "../../components/MutiValueDropdown";

// const grains = [
//     { label: "Sugar", id: 1 },
//     { label: "Wheat", id: 2 },
//     { label: "Rice", id: 3 },
//     { label: "Corn", id: 4 },
//     { label: "Oats", id: 5 },
//     { label: "Barley", id: 6 },
//     { label: "Rye", id: 7 },
//     { label: "Millet", id: 8 },
// ];

function OnboardingMan() {
    const selectProductOptions = ["Wheat", "Sugar", "Masala", "Red Chilli"];
    const [selectedProduct, setSelectedProduct] = useState([
        selectProductOptions[0],
    ]);
    const [productRequirement, setProductRequirement] = useState(0);
    const [product, setProduct] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const auth = useAuth();

    const onSubmit = async () => {
        console.log(auth);
        await addDoc(collection(db, "Manufacturer"), {
            name: auth?.user?.name,
            demandUnits: productRequirement,
            uid: auth?.user?.address,
        });
        console.log("Done");
    };

    return (
        <>
            <Typography
                variant="h3"
                fontWeight="600"
                style={{ textAlign: "center", marginTop: "3rem" }}
            >
                Manufacturer Onboarding
            </Typography>
            <Box
                sx={{
                    height: "100vh",
                    margin: "6rem 1rem",
                }}
            >
                <CustomCard
                    styles={{ padding: "2rem", width: "80%", margin: "auto" }}
                >
                    <form
                        style={{
                            margin: "auto",
                            color: "#1f4e5f",
                            width: "75%",
                        }}
                    >
                        <SuperButton
                            icon={<CloudUploadIcon />}
                            text={"Upload Aadhar Photo"}
                            styles={{ marginBottom: "1.5rem" }}
                        />
                        <TextField
                            variant="outlined"
                            label="Enter product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            fullWidth
                        />
                        <MultiValueDropdown
                            label="Select the raw material?"
                            inputValue={selectedProduct}
                            setInputValue={setSelectedProduct}
                            options={selectProductOptions}
                        />
                        <WeightInput
                            placeholder="Enter the Units Expected"
                            inputValue={productRequirement}
                            setInputValue={setProductRequirement}
                            styles={{ margin: "1.5rem auto" }}
                        />
                        <CustomButton
                            text={"Submit"}
                            onPress={() => {
                                onSubmit();
                            }}
                            styles={{ width: "100%", margin: "auto" }}
                        />
                    </form>
                </CustomCard>
            </Box>
        </>
    );
}

export default OnboardingMan;
