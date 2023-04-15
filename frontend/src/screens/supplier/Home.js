import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dropdown from "../../components/Dropdown";

function Home() {
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
            <Typography variant="h4">{t("Home")}</Typography>
            <Box width={"100%"}>
                <CustomButton
                    text={t("Select Manufacturer")}
                    onPress={() => navigate("/supplier/selectManufacturer")}
                    styles={{
                        width: "100%",
                        padding: "8px",
                        my: 4,
                        cursor: "pointer",
                    }}
                />
                <CustomButton
                    text={t("My Loans")}
                    onPress={() => navigate("/supplier/seeLoans")}
                    styles={{
                        width: "100%",
                        padding: "8px",
                    }}
                />
                <Dropdown
                    label={t("Select Langauge")}
                    options={["English", "Hindi"]}
                    inputValue={selectedLang}
                    setInputValue={setSelectedLang}
                />
            </Box>
        </Box>
    );
}

export default Home;
