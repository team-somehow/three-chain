import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import RuppeInput from "../../components/RuppeInput";

function RepayLoan() {
  const loanId = useParams().id;
  const [loanDetails, setLoanDetails] = useState({
    name: "",
    amount: "",
    interest: "",
    totalAmount: "",
  });
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const navigate = useNavigate();
  const getData = async () => {
    const loanData = await getDoc(doc(db, "RequestedLoans", loanId))
      .then((doc) => doc.data())
      .then((data) => {
        setLoanDetails(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const onSubmit = async () => {
    const totalAmount = loanDetails.totalAmount - repaymentAmount;

    await updateDoc(
      doc(db, "RequestedLoans", loanId),
      totalAmount <= 0
        ? {
            loanStatus: "Paid",
          }
        : {
            totalAmount: loanDetails.totalAmount - repaymentAmount,
          }
    );
    getData();
    navigate("/supplier/seeLoans");
  };
  return (
    <Box m={4}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Typography>Name: {loanDetails.name} </Typography>
        <Typography>Interest: {loanDetails.interest}% </Typography>
        <Typography>Loan Amount: {loanDetails.amount} </Typography>
        <Typography>Loan Amount: {loanDetails.totalAmount} </Typography>
        <RuppeInput input={repaymentAmount} setInput={setRepaymentAmount} />
        <Button type="submit" variant="contained" onClick={onSubmit} fullWidth>
          Pay
        </Button>
      </form>
    </Box>
  );
}

export default RepayLoan;
