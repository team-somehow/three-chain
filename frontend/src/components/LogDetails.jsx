import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';

function LogDetails({ details: { name, from, to, status, id, time } }) {
    
  function pickupOrder() {
    console.log('pickup order');
  }

  function deliverOrder() {
    console.log('deliver order');
  }

  const steps = ['Order Accept', 'Pickup', 'Out for Delivery'];

  function MyStepper() {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Stepper activeStep={status} alternativeLabel>
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
    <Card sx={{ width: 600, marginBottom: 2 }}>
      <CardHeader title={name} subheader={id} />
      <CardContent>
        <TextField
          disabled
          id="outlined-disabled"
          label="From"
          defaultValue={from}
          sx={{ marginRight: '2rem' }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="To"
          defaultValue={to}
        />
        <Typography
          variant="h6"
          color="text.secondary"
          style={{ textAlign: 'center', margin: '1rem 0' }}
        >
          Track
          <MyStepper />
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Last Updated Status : {time}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          aria-label="share"
          onClick={pickupOrder}
          variant="contained"
          color="success"
          sx={{ ml: 1 }}
          disabled={status === 0 ? false : true}
        >
          <ArrowUpwardIcon /> Pickup Order
        </Button>
        <Button
          aria-label="share"
          onClick={deliverOrder}
          variant="contained"
          color="success"
          sx={{ ml: 1 }}
          disabled={status === 1 ? false : true}
        >
          <CheckCircleIcon /> Order Delivered
        </Button>
      </CardActions>
    </Card>
  );
}

export default LogDetails;
