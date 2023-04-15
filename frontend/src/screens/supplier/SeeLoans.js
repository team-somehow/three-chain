import { useAuth } from "@arcana/auth-react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

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
              m: 2,
            }}
          >
            <Typography variant="body1">Loan Id- {item.id}</Typography>
            <Typography>Amount- {item.amount}</Typography>
            <Typography>Payable Amount- {item.totalAmount}</Typography>
            <Typography>Manufacturer ID- {item.manufacturerId}</Typography>
            <Button
              variant="contained"
              color={
                item.loanStatus === "Approved" || item.loanStatus === "Paid"
                  ? "success"
                  : "primary"
              }
            >
              {item.loanStatus}
            </Button>
            {item.loanStatus === "Approved" && (
              <Link to={"/supplier/repay/" + item.id}>
                <Button
                  sx={{
                    ml: 2,
                  }}
                  variant="contained"
                  color="primary"
                >
                  Repay Loan
                </Button>
              </Link>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default SeeLoans;
