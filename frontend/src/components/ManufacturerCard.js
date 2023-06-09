import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";
import ChatIcon from "@mui/icons-material/Chat";
import PaymentIcon from "@mui/icons-material/Payment";

function ManufacturerCard({ uid, name, demandUnits }) {
    return (
        <CustomCard styles={{ marginBottom: "1rem" }}>
            <Box>
                {/* <Typography >Manufacturer {id}</Typography> */}
                <Typography variant="h5" fontWeight="600">
                    Name: {name}
                </Typography>
                <Typography className="py-3" fontWeight="500" variant="h6">
                    Demand Units: {demandUnits} kg
                </Typography>
                <Link to={"/chat/" + uid}>
                    <CustomButton
                        text={"Chat"}
                        onPress={() => {}}
                        icon={<ChatIcon sx={{ marginRight: "0.5rem" }} />}
                        btnProps={undefined}
                        styles={undefined}
                        typographyVariant={undefined}
                    />
                </Link>
                <Link
                    to={"/supplier/loan/" + uid}
                    style={{
                        marginLeft: "18px",
                    }}
                >
                    {/* <Button
            variant="contained"
            sx={{
              ml: 2,
            }}
          >
            Get Loan
          </Button> */}
                    <CustomButton text={"Get Loan"} onPress={() => {}} />
                </Link>
            </Box>
        </CustomCard>
    );
}

export default ManufacturerCard;
