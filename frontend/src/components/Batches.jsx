import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CustomCard from "./CustomCard";

function MyCard(props) {
    function loanApprove() {
        console.log("Loan Approved");
    }

    const steps = ["Manufacturer", "Regulator", "Logistics", "Buyer"];

    const trackStatus = ["In Transit", "On Shelf", "Customer"];
    const status = () => {
        if (props.currentLocation === "Manufacturer") return 0;
        else if (props.currentLocation === "Regulator") return 1;
        else if (props.currentLocation === "Logistic") return 2;
        else return 3;
    };
    function MyStepper() {
        return (
            <Box sx={{ width: "100%", p: 3 }}>
                <Stepper activeStep={status()} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        );
    }

    return (
        <CustomCard styles={{ width: "60%", marginBottom: "1rem" }}>
            <Typography variant="h5" fontWeight="600">
                {props.productName}
            </Typography>
            <Typography variant="h6" fontWeight="500">
                {props.batchId}
            </Typography>
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    Quantity : {props.quantity}
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    style={{ textAlign: "center" }}
                >
                    Track
                    <MyStepper />
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Status : {trackStatus[2]}
                </Typography>
                <Typography variant="body1" className="text-green-600">
                    Current Location : {props.currentLocation}
                </Typography>
                <Typography variant="body1">
                    Verification Status:{" "}
                    {props.regulatorVerification.toString()}
                </Typography>
            </CardContent>
        </CustomCard>
    );
}

export default MyCard;
