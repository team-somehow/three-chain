import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dropdown from "../../components/Dropdown";
import CustomCard from "../../components/CustomCard";
import LanguageDropdown from "../../components/languageDropdown";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

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
    {
        text: "Customer  Login",
        url: "/customer/login",
    },
];
function Login() {
    const navigate = useNavigate();
    // const [selectedLang, setSelectedLang] = useState("English");
    const [isActive, setIsActive] = useState(false);

    const { t, i18n } = useTranslation();
    // const changeLang = () => {
    //     console.log(selectedLang);
    //     i18n.changeLanguage(selectedLang === "English" ? "en" : "hi");
    // };

    return (
        <Box sx={{ m: 2 }}>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Box display={"flex"} alignItems={"center"}>
                    <img src="./logo192.png" width={"50px"} />
                    <Typography ml={2} variant="h4" align="center">
                        {"Three Chain"}
                    </Typography>
                </Box>
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
            {/* <Dropdown
                label={t("Select Langauge")}
                options={["English", t("Hindi")]}
                inputValue={selectedLang}
                setInputValue={setSelectedLang}
            /> */}
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
            </CustomCard>
        </Box>
    );
}

export default Login;
