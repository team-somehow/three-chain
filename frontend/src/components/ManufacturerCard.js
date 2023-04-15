import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";

function ManufacturerCard({ id, name, demandUnits }) {
  return (
    <CustomCard>
      <Box
        sx={{
          p: 2,
        }}
      >
        {/* <Typography >Manufacturer {id}</Typography> */}
        <Typography variant="h5">Name: {name}</Typography>
        <Typography>Demand Units: {demandUnits} kg</Typography>
        <Link to={"/chat/" + id}>
          <CustomButton text={"Chat"} onPress={() => {}} />
          {/* <Button variant="contained">Chat</Button> */}
        </Link>
        <Link
          to={"/supplier/loan/" + id}
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
