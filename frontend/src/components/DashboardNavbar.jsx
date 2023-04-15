import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import NavLink from "./NavLink";

import ApartmentIcon from "@mui/icons-material/Apartment";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ChatIcon from "@mui/icons-material/Chat";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DashboardNavbar = (props) => {
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
                <List>
                    <div
                        style={{
                            paddingLeft: "18px",
                            marginTop: "-12px",
                            marginBottom: "28px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <ListItem onClick={() => navigate("/manufacturer/dash/home")}>
                            <ListItemText>
                                <h2>Dashboard</h2>
                            </ListItemText>
                        </ListItem>
                    </div>

                    <NavLink
                        text={"Select Demand"}
                        icon={<HandshakeIcon />}
                        onClickNavigateTo="/buyer/browse"
                        isActive={currentRoute === "/buyer/browse"}
                    />
                    <NavLink
                        text={"Approve Loans"}
                        icon={<ApartmentIcon />}
                        onClickNavigateTo="/buyer/my"
                        isActive={currentRoute === "/buyer/my"}
                    />
                    <NavLink
                        text={"My Batches"}
                        icon={<ChatIcon />}
                        onClickNavigateTo="/chat"
                        isActive={currentRoute === "/chat"}
                    />
                </List>
                <Box
                    position={"absolute"}
                    width={"calc(100% - 20px)"}
                    bottom={"20px"}
                    margin={"auto"}
                >
                </Box>
            </Box>
        </Drawer>
    );
};

export default DashboardNavbar;