import { Box, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <Box sx={{ m: 2 }}>
            <Typography variant="h4">Home</Typography>
            <Box width={"100%"}>
                <CustomButton
                    text={"Select Menu"}
                    onPress={() => navigate("/supplier/selectManufacturer")}
                    styles={{
                        width: "100%",
                        padding: "8px",
                        my: 4,
                        cursor: "pointer",
                    }}
                />
                <CustomButton
                    text={"My Loans"}
                    onPress={() => navigate("/supplier/seeLoans")}
                    styles={{
                        width: "100%",
                        padding: "8px",
                    }}
                />
            </Box>
        </Box>
    );
}

export default Home;
