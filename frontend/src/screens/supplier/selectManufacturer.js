import { Box } from "@mui/material";
import React, { useState } from "react";
import ManufacturerCard from "../../components/ManufacturerCard";

function SelectManufacturer() {
  const [mList, setMList] = useState([
    {
      id: 1,
      name: "Vinay",
      demandUnits: "1000kg",
    },
  ]);
  return (
    <Box m={2}>
      <h1>Select Manufacturer</h1>
      {mList.map((m) => {
        return (
          <ManufacturerCard
            id={m.id}
            name={m.name}
            demandUnits={m.demandUnits}
            url={"/supplier/getLoan/" + m.id}
          />
        );
      })}
    </Box>
  );
}

export default SelectManufacturer;
