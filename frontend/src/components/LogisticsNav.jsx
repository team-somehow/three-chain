import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NavLink from "./NavLink";

import ApartmentIcon from "@mui/icons-material/Apartment";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider, Typography } from "@mui/material";

const LogisticsNavbar = (props) => {
    const navigate = useNavigate();
    const currentRoute = useLocation().pathname;
    return (
        <Drawer
            sx={{
                width: 350,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 280,
                    boxSizing: "border-box",
                    // background: "rgba(252, 254, 254, 0.43)",
                    // background: "rgba(255, 0, 0, 0.85)",
                    // backdropFilter: "blur(25px)",
                },
            }}
            variant="permanent"
            anchor="left"
            classes={{ paper: "awesome-bg-0" }}
        >
            <Box role="presentation" p={2}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    mb={2}
                >
                    <img src="/logo192.png" width={"60px"} />
                    <Typography variant="h5" ml={2}>
                        3 Chain
                    </Typography>
                </Box>
                <Divider />
                <List>
                    <div
                        style={{
                            // paddingLeft: "18px",
                            marginTop: "-12px",
                            marginBottom: "28px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <ListItem onClick={() => navigate("/logistics")}>
                            <ListItemText>
                                <h1 className="text-[#1f4e5f] font-black text-xl">
                                    Logistics Dashboard
                                </h1>
                            </ListItemText>
                        </ListItem>
                    </div>

                    <NavLink
                        text={"Get Details"}
                        icon={<HandshakeIcon />}
                        onClickNavigateTo="/logistics/details"
                        isActive={currentRoute === "/logistics/details"}
                    />
                </List>
                <Box
                    position={"absolute"}
                    width={"calc(100% - 20px)"}
                    bottom={"20px"}
                    margin={"auto"}
                ></Box>
            </Box>
        </Drawer>
    );
};

export default LogisticsNavbar;
