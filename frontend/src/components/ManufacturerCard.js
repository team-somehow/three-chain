import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ManufacturerCard({ id, name, demandUnits }) {
	return (
		<Card
			sx={{
				p: 2,
			}}
		>
			{/* <Typography >Manufacturer {id}</Typography> */}
			<Typography variant="h5">Name: {name}</Typography>
			<Typography>Demand Units: {demandUnits} kg</Typography>
			<Link to={"/chat/" + id}>
				<Button variant="contained">Chat</Button>
			</Link>
			<Link to={"/supplier/loan/" + id}>
				<Button
					variant="contained"
					sx={{
						ml: 2,
					}}
				>
					Get Loan
				</Button>
			</Link>
		</Card>
	);
}

export default ManufacturerCard;
