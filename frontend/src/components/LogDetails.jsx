import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function LogDetails(props) {
    function pickupOrder() {
        console.log("pickup order");
    }

    function deliverOrder() {
        console.log("deliver order");
    }

    const steps = ["Order Accept", "Pickup", "Out for Delivery"];

    function MyStepper() {
        return (
            <Box sx={{ width: "100%", p: 3 }}>
                <Stepper activeStep={0} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        );
    }
    const onOrderDelivered = async () => {
        const snapshot = await getDocs(collection(db, "Manufacturer"));
        let docId = "";
        let newData = [];
        snapshot.forEach((doc) => {
            const t = doc.data();
            for (let i = 0; i < t.products.length; i++) {
                if (t.products[i].batchId === props.batchId) {
                    docId = doc.id;
                    newData = t.products;
                    newData[i].logistic = true;
                    newData[i].itemInTransit = !(true && props.buyer);
                    newData[i].itemReached = true;
                }
            }
        });

        await updateDoc(doc(db, "Manufacturer", docId), {
            products: newData,
        });
        console.log("true");
    };

    return (
        <Card sx={{ width: 600, marginBottom: 2 }}>
            <CardHeader title={props.productName} subheader={props.batchId} />
            <CardContent>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="From"
                    defaultValue={"Mumbai"}
                    sx={{ marginRight: "2rem" }}
                />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="To"
                    defaultValue={"Goa"}
                />
                <Typography
                    variant="h6"
                    color="text.secondary"
                    style={{ textAlign: "center", margin: "1rem 0" }}
                >
                    Track
                    <MyStepper />
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Last Updated Status : {"12:30PM"}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button
                    aria-label="share"
                    onClick={pickupOrder}
                    variant="contained"
                    color="success"
                    sx={{ ml: 1 }}
                    // disabled={ === 0 ? false : true}
                >
                    <ArrowUpwardIcon /> Pickup Order
                </Button>
                <Button
                    aria-label="share"
                    onClick={deliverOrder}
                    variant="contained"
                    // color="success"
                    sx={{ ml: 1 }}
                    // disabled={status === 1 ? false : true}
                    onClick={() => onOrderDelivered()}
                >
                    <CheckCircleIcon /> Order Delivered
                </Button>
            </CardActions>
        </Card>
    );
}

export default LogDetails;
