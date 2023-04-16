import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dropdown from "../../components/Dropdown";
import LanguageDropdown from "../../components/languageDropdown";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

function Home() {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState("English");
    const [isActive, setIsActive] = useState(false);
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
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width="100%"
            >
                <Typography variant="h4">{t("Home")}</Typography>
                <Box display={"flex"} alignItems={"center"}>
                    <Link
                        to="/chatbot"
                        sx={{
                            mr: 1,
                        }}
                    >
                        <IconButton>
                            <ChatBubbleIcon />
                        </IconButton>
                    </Link>
                    <LanguageDropdown
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </Box>
            </Box>
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
                {/* <Dropdown
                    label={t("Select Langauge")}
                    options={["English", t("Hindi")]}
                    inputValue={selectedLang}
                    setInputValue={setSelectedLang}
                /> */}
            </Box>
        </Box>
    );
}

export default Home;
