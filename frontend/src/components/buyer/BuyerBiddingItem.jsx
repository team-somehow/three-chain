import { useAuth } from "@arcana/auth-react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";

const BuyerBiddingItem = (props) => {
	// console.log(props);
	const auth = useAuth();
	const placeBid = async () => {
		const getData = async () => {
			let tData = [];
			const snapshot = await getDocs(collection(db, "Manufacturer"));
			let docId = "";
			let data = {};
			snapshot.forEach((doc) => {
				const t = doc.data();
				for (let i = 0; i < t.products.length; i++) {
					if (t.products[i].batchId === props.batchId) {
						docId = doc.id;
						data = t.products;
						if (data[i].bids?.length) {
							data[i].bids.push({
								price: props.price,
								name: auth.user.name,
								amount: Number(props.price) * Number(props.quantity),
							});
						} else {
							data[i].bids = [
								{
									price: props.price,
									name: auth.user.name,
									amount: Number(props.price) * Number(props.quantity),
								},
							];
						}
						console.log(data[i]);
					}
				}
			});
			console.log("yoooooo", data);
			await updateDoc(doc(db, "Manufacturer", docId), {
				products: data,
			});
		};
		getData();
	};
	return (
		<Box
			component={Paper}
			sx={{
				m: 2,
				p: 3,
			}}
		>
			<Typography variant="h5">{props.productName}</Typography>
			<Typography>Quantity-{props.quantity}</Typography>
			<Typography>Current Location-{props.warehouse}</Typography>
			<Typography>Price per Item-{props.price}</Typography>
			<Typography>
				Total Price- {Number(props.price) * props.quantity}
			</Typography>
			<Typography>Batch Id- {props.batchId}</Typography>
			<Button onClick={() => placeBid()} variant="contained">
				Place Bid for the Batch
			</Button>
		</Box>
	);
};

export default BuyerBiddingItem;
