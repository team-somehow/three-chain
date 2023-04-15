import React, { useState } from "react";
import { Typography, Card, TextField, Button } from "@mui/material";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

function CreateBatch() {
  const [batch, setBatch] = useState({
    name: "",
    quantity: "",
    price: "",
    warehouse: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setBatch((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit() {
    console.log(batch);
    setBatch({
      name: "",
      quantity: "",
      price: "",
      warehouse: "",
    });
    await addDoc(collection(db, "Batches"), batch);
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography variant="h4" style={{ margin: "1rem 0" }}>
        Create Batch
      </Typography>
      <Card
        sx={{
          width: "90%",
          height: "100%",
          marginTop: "3rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          name="name"
          sx={{ my: 2 }}
          id="outlined-basic"
          label="Product Name"
          variant="outlined"
          value={batch.name}
          onChange={handleChange}
        />
        <TextField
          name="quantity"
          sx={{ my: 2 }}
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          value={batch.quantity}
          onChange={handleChange}
        />
        <TextField
          name="price"
          sx={{ my: 2 }}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={batch.price}
          onChange={handleChange}
        />
        <TextField
          name="warehouse"
          sx={{ my: 2 }}
          id="outlined-basic"
          label="Warehouse Name"
          variant="outlined"
          value={batch.warehouse}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Create Batch
        </Button>
      </Card>
    </div>
  );
}

export default CreateBatch;
