import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ManufacturerCard({ id, name, demandUnits, url }) {
  return (
    <Link to={url}>
      <Card
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h5">Manufacturer {id}</Typography>
        <Typography>Name: {name}</Typography>
        <Typography>Demand Units: {demandUnits}</Typography>
        <Link to={"/chat/" + id}>
          <Button variant="contained">Chat</Button>
        </Link>
      </Card>
    </Link>
  );
}

export default ManufacturerCard;
