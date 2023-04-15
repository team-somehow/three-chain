import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dropdown from "../../components/Dropdown";
import CustomCard from "../../components/CustomCard";
const loginLinks = [
    {
        text: "Supplier Login",
        url: "/supplier/login",
    },
    {
        text: "Buyer Login",
        url: "/buyer/login",
    },
    {
        text: "Manufacturer Login",
        url: "/manufacturer/login",
    },
    {
        text: "Logistics Login",
        url: "/logistics/login",
    },
    {
        text: "Regulator  Login",
        url: "/regulator/login",
    },
];
function Login() {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState("English");
    const { t, i18n } = useTranslation();
    // const changeLang = () => {
    //     console.log(selectedLang);
    //     i18n.changeLanguage(selectedLang === "English" ? "en" : "hi");
    // };
    useEffect(() => {
        i18n.changeLanguage(selectedLang === "English" ? "en" : "hi");
    }, [selectedLang]);

    return (
        <Box sx={{ m: 2 }}>
            <Typography variant="h4" align="center">
                {"Three Chain"}
            </Typography>
            <CustomCard
                styles={{
                    marginTop: "1rem",
                    paddingTop: "2rem",
                }}
            >
                {loginLinks.map((link) => (
                    <CustomButton
                        text={t(link.text)}
                        onPress={() => navigate(link.url)}
                        styles={{
                            width: "100%",
                            padding: "8px",
                            my: 2,
                            cursor: "pointer",
                        }}
                    />
                ))}
                <Dropdown
                    label={t("Select Langauge")}
                    options={["English", t("Hindi")]}
                    inputValue={selectedLang}
                    setInputValue={setSelectedLang}
                />
            </CustomCard>
        </Box>
    );
}

export default Login;