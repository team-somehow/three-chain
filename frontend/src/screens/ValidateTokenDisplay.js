import {
    Step,
    Stepper,
    Box,
    Dialog,
    Paper,
    Typography,
    StepLabel,
    Button,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
// import { B } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sha256 from "sha256";
import CustomCard from "../components/CustomCard";
import { db } from "../config/firebase";

const ValidateTokenDisplay = () => {
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);

    const { tokenId } = useParams();
    console.log(tokenId);
    const steps = ["Manufacturer", "Regulator", "Logistics", "Buyer"];
    const status = () => {
        if (data?.currentLocation === "Manufacturer") return 0;
        else if (data?.currentLocation === "Regulator") return 1;
        else if (data?.currentLocation === "Logistic") return 2;
        else return 3;
    };

    useEffect(() => {
        const getData = async () => {
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            snapshot.forEach((item) => {
                let t = item.data();
                // console.log(t);
                for (let i = 0; i < t?.products?.length; i++) {
                    if (t.products[i].batchId.toString() == tokenId) {
                        console.log(t.products[i].batchId, tokenId);
                        setData(t.products[i]);
                    }
                }
            });
        };
        getData();
    }, []);

    // return <></>;

    function MyStepper() {
        return (
            <Box sx={{ width: "100%", p: 3 }}>
                <Stepper
                    activeStep={status()}
                    // alternativeLabel
                    orientation="vertical"
                >
                    <Step key={"Manufacturer"}>
                        <StepLabel>{"Manufacturer"}</StepLabel>
                        <Typography>{data?.regulatorDT}</Typography>
                        <Typography>
                            {sha256(data?.batchId || "idli")}
                        </Typography>
                    </Step>
                    <Step key={"Regulator"}>
                        <StepLabel>{"Regulator"}</StepLabel>
                        <Typography>{data?.manufacturerDT}</Typography>
                    </Step>
                    <Step key={"Logistics"}>
                        <StepLabel>{"Logistics"}</StepLabel>
                        <Typography>{data?.logisticDT}</Typography>
                    </Step>
                    <Step key={"Buyer"}>
                        <StepLabel>{"Buyer"}</StepLabel>
                        <Typography>{data?.buyerDT}</Typography>
                        {status() == 3 && (
                            <Typography>
                                {sha256(data?.batchId || "idli")}
                            </Typography>
                        )}
                    </Step>
                </Stepper>
            </Box>
        );
    }
    if (data !== null) {
        return (
            <>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <Box
                        component={Paper}
                        sx={{
                            width: "80vw",
                            p: 4,
                        }}
                    >
                        <Typography>Successfully Reported the Item</Typography>
                    </Box>
                </Dialog>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        gap: 2,
                        mx: 3,
                        my: 3,
                    }}
                >
                    <CustomCard styles={{ m: 2 }}>
                        <Typography variant="h5">Regulator ID</Typography>
                        <Typography>
                            0x37ED61F8CD09261Aea1622af723Ce01Da9e93471
                        </Typography>
                        <Typography>Arriving Data- 16th April 2023</Typography>
                    </CustomCard>
                    <CustomCard>
                        <Typography variant="h5">Current Location</Typography>
                        <Typography>Stage: {data?.currentLocation}</Typography>
                        <Typography>
                            0x9ef7A9fC0f33785338Af3586420743a95B9a8d65
                        </Typography>
                    </CustomCard>
                    <CustomCard>
                        <Typography variant="h5">Product BatchId</Typography>
                        <Typography> {data?.batchId}</Typography>
                    </CustomCard>
                    <CustomCard>
                        <MyStepper />
                    </CustomCard>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        fullWidth
                    >
                        {" "}
                        Report Issue
                    </Button>
                </Box>
            </>
        );
    }
};

export default ValidateTokenDisplay;
