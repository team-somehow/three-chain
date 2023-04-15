import { useAuth } from "@arcana/auth-react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";

const SeeLoans = () => {
	const auth = useAuth();
	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			const q = query(
				collection(db, "RequestedLoans"),
				where("walletAddress", "==", auth.user.address)
			);
			const snapshot = await getDocs(q);
			let tData = [];
			snapshot.forEach((doc) => {
				tData.push({ id: doc.id, ...doc.data() });
			});
			console.log(tData);
			setData(tData);
		};
		getData();
	}, [auth]);

	return (
		<Box m={2}>
			<Typography variant="h4">My Loans</Typography>
			{data.map((item) => {
				return (
					<Box
						component={Paper}
						sx={{
							p: 2,
						}}
					>
						<Typography variant="body1">LoanId- {item.id}</Typography>
						<Typography>Amount- {item.amount}</Typography>
						<Typography>Manufacturer ID- {item.manufacturerId}</Typography>
						<Button variant="contained">{item.loanStatus}</Button>
					</Box>
				);
			})}
		</Box>
	);
};

export default SeeLoans;
