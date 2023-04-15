import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RuppeInput from "../../components/RuppeInput";
import Dropdown from "../../components/Dropdown";
import { useAuth } from "@arcana/auth-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useParams } from "react-router-dom";
import { providers, Contract, ethers } from "ethers";
import { arcanaProvider } from "../..";
import { LoanContractAddress } from "../../constants/constants";
import LoanAbi from "../../artifacts/contracts/Loan.sol/Loan.json";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CustomAppBar from "../../components/AppBar";

function Loan() {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(LoanContractAddress, LoanAbi.abi, signer);
    const durationOptions = [6, 12, 18];
    const [interest, setInterest] = useState(10);
    const [selectedDuration, setSelectedDuration] = useState(
        durationOptions[0]
    );
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
            manufacturerId: auth?.user?.address,
            tenure: selectedDuration,
        });
        await arcanaProvider.connect();
        await contract.requestLoan(
            auth.user.address,
            ethers.utils.parseEther(totalAmount.toString()),
            selectedDuration
        );
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
        <>
            <CustomAppBar title={"Request Loan"} onBackUrl={"/supplier/home"} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh",
                    p: 2,
                }}
            >
                <CustomCard>
                    <Typography
                        mt={2}
                        variant="h4"
                        fontWeight="500"
                        textAlign="center"
                    >
                        Loan Details
                    </Typography>
                    <form style={{ marginTop: "1rem" }}>
                        <RuppeInput
                            input={loanAmount}
                            setInput={setLoanAmount}
                        />
                        <Dropdown
                            label={"Duration(in Months) "}
                            options={durationOptions}
                            inputValue={selectedDuration}
                            setInputValue={setSelectedDuration}
                        />
                        <Divider
                            sx={{
                                my: 3,
                            }}
                        />
                        <Typography variant="h5" fontWeight="600">
                            Interest: {interest}%
                        </Typography>
                        <Typography variant="h5" fontWeight="600">
                            Total Amount: {totalAmount.toFixed(2)}
                        </Typography>
                        {/* <Button
          variant="contained"
          sx={{
            mt: 4,
          }}
          onClick={() => RequestLoan()}
        >
          Request Manufacturer
        </Button> */}
                        <Box
                            sx={{
                                mt: 2,
                                mb: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CustomButton
                                text={"Request Manufacturer"}
                                onPress={() => RequestLoan()}
                                icon={
                                    <CurrencyRupeeRoundedIcon
                                        sx={{ marginRight: "0.5rem" }}
                                    />
                                }
                            />
                        </Box>
                    </form>
                </CustomCard>
            </Box>
        </>
    );
}

export default Loan;
