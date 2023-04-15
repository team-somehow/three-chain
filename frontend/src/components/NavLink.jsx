import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Home = ({ text, icon, onClickNavigateTo, isActive }) => {
    return (
        <>
            {/* <ListItem key={text}> */}
            <Link
                to={onClickNavigateTo || "/"}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <ListItemButton
                    style={{
                        background: isActive ? "#79A8A9" : "inherit",
                        color: isActive ? "white" : "inherit",
                        borderRadius: "1rem",
                        transition: "all 0.5s ease-in-out",
                        marginTop: "1rem",
						fontWeight : '700',
                    }}
                >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </Link>
            {/* </ListItem> */}
        </>
    );
};

export default Home;
