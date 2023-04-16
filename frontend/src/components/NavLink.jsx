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
					background: isActive
						? "linear-gradient(166.88deg, #54A3FF 9.45%, #348FF9 227.32%)"
						: "inherit",
					color: isActive ? "white" : "inherit",
					borderRadius: "12px",
					transition: "all 0.3s ease-in-out",
					marginTop: "10px",
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