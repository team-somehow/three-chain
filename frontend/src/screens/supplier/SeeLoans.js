import { useAuth } from "@arcana/auth-react";
import { AppBar, Box, Button, Paper, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import CheckIcon from "@mui/icons-material/Check";
import CustomAppBar from "../../components/AppBar";
import { useTranslation } from "react-i18next";

const SeeLoans = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);
    const { t, i18n } = useTranslation();
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
        <>
            <CustomAppBar title={t("My Loans")} onBackUrl={"/supplier/home"} />
            <Box m={2}>
                {/* <Typography mb={2} variant="h4">
                    My Loans
                </Typography> */}
                {data.map((item) => {
                    return (
                        <Box mb={2}>
                            <CustomCard>
                                <Box>
                                    <Typography variant="body1">
                                        {t("Loan Id")}- <b>{item.id}</b>
                                    </Typography>
                                    <Typography>
                                        {t("Amount")}-<b>{item.amount}</b>
                                    </Typography>
                                    <Typography>
                                        {t("Payable Amount")}-{" "}
                                        <b>{item.totalAmount}</b>
                                    </Typography>
                                    <Typography>
                                        {t("Manufacturer ID")}-{" "}
                                        <b>{item.manufacturerId}</b>
                                    </Typography>
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        my={1}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: "16px",
                                            }}
                                            color={
                                                item.loanStatus ===
                                                    "Approved" ||
                                                item.loanStatus === "Paid"
                                                    ? "success"
                                                    : "primary"
                                            }
                                        >
                                            {item.loanStatus === "Paid" && (
                                                <CheckIcon />
                                            )}
                                            {t(item.loanStatus)}
                                        </Button>
                                        {item.loanStatus === "Approved" && (
                                            <Link
                                                to={
                                                    "/supplier/repay/" + item.id
                                                }
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                            >
                                                <CustomButton
                                                    text={t("Repay Loan")}
                                                    onPress={() => {}}
                                                />
                                            </Link>
                                        )}
                                        <Link
                                            to={"/chat/" + item.manufacturerId}
                                            style={{
                                                marginLeft: 10,
                                            }}
                                        >
                                            <CustomButton
                                                text={"Chat"}
                                                onPress={() => {}}
                                            />
                                        </Link>
                                    </Box>
                                </Box>
                            </CustomCard>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
};

export default SeeLoans;
