import React, { useState } from "react";
import { Typography, Card, TextField, Button } from "@mui/material";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "@arcana/auth-react";
// import crypto from "crypto";

function CreateBatch() {
	const [batch, setBatch] = useState({
		name: "",
		quantity: "",
		price: "",
		warehouse: "",
	});

	const auth = useAuth();
	function handleChange(e) {
		const { name, value } = e.target;
		setBatch((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	async function handleSubmit() {
		const q = query(
			collection(db, "Manufacturer"),
			where("uid", "==", auth.user.address)
		);
		const snapshot = await getDocs(q);
		let data;
		let index = 0;
		snapshot.forEach((doc) => {
			if (index === 0) {
				data = { id: doc.id, ...doc.data() };
			}
			index++;
		});
		await updateDoc(doc(db, "Manufacturer", data.id), {
			products: arrayUnion({
				productName: batch.name,
				quantity: batch.quantity,
				warehouse: batch.warehouse,
				price: batch.price,
				regulatorVerification: false,
				batchId: window.crypto.randomUUID()
			}),
		});
		console.log("done");
	}

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<Typography variant="h4" style={{ margin: "1rem 0" }}>
				Create Batch
			</Typography>
			<Card
				sx={{
					width: "90%",
					height: "100%",
					marginTop: "3rem",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<TextField
					name="name"
					sx={{ my: 2 }}
					id="outlined-basic"
					label="Product Name"
					variant="outlined"
					value={batch.name}
					onChange={handleChange}
				/>
				<TextField
					name="quantity"
					sx={{ my: 2 }}
					id="outlined-basic"
					label="Quantity"
					variant="outlined"
					value={batch.quantity}
					onChange={handleChange}
				/>
				<TextField
					name="price"
					sx={{ my: 2 }}
					id="outlined-basic"
					label="Price"
					variant="outlined"
					value={batch.price}
					onChange={handleChange}
				/>
				<TextField
					name="warehouse"
					sx={{ my: 2 }}
					id="outlined-basic"
					label="Warehouse Name"
					variant="outlined"
					value={batch.warehouse}
					onChange={handleChange}
				/>
				<Button variant="contained" onClick={handleSubmit}>
					Create Batch
				</Button>
			</Card>
		</div>
	);
}

export default CreateBatch;
