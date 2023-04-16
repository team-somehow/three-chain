import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";

function LanguageDropdown({ isActive, setIsActive }) {
    const { t, i18n } = useTranslation();
    useEffect(() => {
        i18n.changeLanguage("en");
    }, []);
    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => setIsActive(true)}
            >
                <TranslateIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                open={isActive}
                // anchorEl={{
                //     vertical: "top",
                //     horizontal: "left",
                // }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={() => {
                        i18n.changeLanguage("en");
                        setIsActive(false);
                    }}
                >
                    English
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        i18n.changeLanguage("hi");
                        setIsActive(false);
                    }}
                >
                    Hindi
                </MenuItem>
            </Menu>
        </div>
    );
}

export default LanguageDropdown;
