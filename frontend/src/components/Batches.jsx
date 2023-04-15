import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function MyCard({
  supplier: {
    name,
    quantity,
    track,
    status,
    id,
  },
}) {

  function loanApprove(){
    console.log('Loan Approved');
  }

const steps = [
  'Transactor',
  'Wholesaler',
  'Retailer',
];

const trackStatus = [
    'In Transit',
    'On Shelf',
    'Customer',
  ];

function MyStepper() {
  return (
    <Box sx={{ width: '100%' , p: 3}}>
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
        <Typography variant="body1" color="text.secondary">
          Quantity : {quantity}
        </Typography>
        <Typography variant="h6" color="text.secondary" style={{textAlign : 'center'}}>
          Track
          <MyStepper />
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Status : {trackStatus[status]}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/chat/${id}`}>
        <Button aria-label="add to favorites" variant='contained'>
          <ChatIcon /> Chat
        </Button>
        </Link>
        <Button aria-label="share" onClick={loanApprove} variant='contained' color='success' sx={{ml : 1}}>
          <CheckCircleIcon /> Approve Loan
        </Button>
      </CardActions>
    </Card>
  );
}

export default MyCard;
