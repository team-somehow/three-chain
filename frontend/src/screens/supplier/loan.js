import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RuppeInput from "../../components/RuppeInput";
import Dropdown from "../../components/Dropdown";
import { useAuth } from "@arcana/auth-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useParams } from "react-router-dom";

function Loan() {
	const durationOptions = [6, 12, 18];
	const [interest, setInterest] = useState(10);
	const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);
	const [loanAmount, setLoanAmount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const auth = useAuth();
	const { id } = useParams();
	const RequestLoan = async () => {
		await addDoc(collection(db, "RequestedLoans"), {
			interest: interest,
			name: auth.user.name,
			amount: loanAmount,
			walletAddress: auth?.user?.address,
			totalAmount: totalAmount,
			loanStatus: "Requested",
			manufacturerId: id,
			tenure: selectedDuration,
		});
		console.log("Done");
	};
	useEffect(() => {
		console.log(auth?.user?.address);
	}, [auth]);
	useEffect(() => {
		let A = loanAmount * Math.pow(1 + interest / 1200, selectedDuration);
		setTotalAmount(A);
	}, [loanAmount, interest, selectedDuration]);

	return (
		<Box m={2} my={4}>
			<Typography variant="h4">Request with Loan</Typography>
			<form>
				<RuppeInput input={loanAmount} setInput={setLoanAmount} />
				<Dropdown
					label={"Duration(in Months) "}
					options={durationOptions}
					inputValue={selectedDuration}
					setInputValue={setSelectedDuration}
				/>
				<Divider
					sx={{
						my: 2,
					}}
				/>
				<Typography variant="h5">Interest: {interest}%</Typography>
				<Typography variant="h5">
					Total Amount: {totalAmount.toFixed(2)}
				</Typography>
				<Button
					variant="contained"
					sx={{
						mt: 4,
					}}
					onClick={() => RequestLoan()}
				>
					Request Manufacturer
				</Button>
			</form>
		</Box>
	);
}

export default Loan;
