import { Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ManufacturerCard from "../../components/ManufacturerCard";
import { db } from "../../config/firebase";

function SelectManufacturer() {
	const [mList, setMList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const snapshot = await getDocs(collection(db, "Manufacturer"));
			let tData = [];
			snapshot.forEach((doc) => {
				tData.push({ id: doc.id, ...doc.data() });
			});
			setMList(tData);
		};
		getData();
	}, []);
	return (
		<Box m={2}>
			<h1>Select Manufacturer</h1>
			{mList.map((m) => {
				return (
					<ManufacturerCard
						id={m.id}
						name={m.name}
						demandUnits={m.demandUnits}
					/>
				);
			})}
		</Box>
	);
}

export default SelectManufacturer;
