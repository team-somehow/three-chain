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

const DashboardNavbar = (props) => {
    const navigate = useNavigate();
    const currentRoute = useLocation().pathname;
    return (
        <Drawer
            sx={{
                width: 280,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 280,
                    boxSizing: "border-box",
                    // background: "rgba(252, 254, 254, 0.43)",
                    background: "#F4F7F7",
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
                        <ListItem
                            onClick={() => navigate("/manufacturer/dash")}
                        >
                            <ListItemText>
                                <h1 className="text-[#1f4e5f] font-black text-xl">
                                    Manufacturer Dashboard
                                </h1>
                            </ListItemText>
                        </ListItem>
                    </div>

                    <NavLink
                        text={"Select Supplier"}
                        icon={<HandshakeIcon />}
                        onClickNavigateTo="/manufacturer/dash/selectSupplier"
                        isActive={
                            currentRoute === "/manufacturer/dash/selectSupplier"
                        }
                    />
                    <NavLink
                        text={"Approve Loans"}
                        icon={<ApartmentIcon />}
                        onClickNavigateTo="/manufacturer/dash/approveLoan"
                        isActive={
                            currentRoute === "/manufacturer/dash/approveLoan"
                        }
                    />
                    <NavLink
                        text={"My Batches"}
                        icon={<ChatIcon />}
                        onClickNavigateTo="/manufacturer/dash/batches"
                        isActive={currentRoute === "/manufacturer/dash/batches"}
                    />
                    <NavLink
                        text={"Create Batch"}
                        icon={<AddIcon />}
                        onClickNavigateTo="/manufacturer/dash/createBatch"
                        isActive={
                            currentRoute === "/manufacturer/dash/createBatch"
                        }
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

export default DashboardNavbar;
