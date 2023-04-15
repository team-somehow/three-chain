import { useAuth } from "@arcana/auth-react";
import { Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import BuyerBiddingItem from "../../components/buyer/BuyerBiddingItem";
import { db } from "../../config/firebase";

const BuyerBid = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			let tData = [];
			const snapshot = await getDocs(collection(db, "Manufacturer"));
			snapshot.forEach((doc) => {
				const t = doc.data();
				for (let i = 0; i < t.products.length; i++) {
					if (t.products[i].regulatorVerification) {
						tData.push(t.products[i]);
					}
				}
			});
			setData(tData);
		};
		getData();
	}, []);

	return (
		<Box>
			<Typography variant="h3" align="center">
				Bid for Items
			</Typography>
			{data.map((item) => {
				return <BuyerBiddingItem {...item} />;
			})}
		</Box>
	);
};

export default BuyerBid;
