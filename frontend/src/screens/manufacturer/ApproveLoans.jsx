import * as React from 'react';
import Center from '../../components/utils/Center';
import Typography from '@mui/material/Typography';
import MyCard from '../../components/MyCard';

const suppliers = [
  {
    name: 'Supplier 1',
    id: 1,
    aadhar: '9945 2454 1434 3532',
    tenure: '6 months',
    interest: '5%',
    product: 'Rice',
    quantity: 100,
    price: 10,
    request: 'Some request',
    expanded : false,
  },
  {
    name: 'Supplier 2',
    id: 2,
    aadhar: '5955 3254 6434 8532',
    tenure: '12 months',
    interest: '10%',
    product: 'wheat',
    quantity: 1000,
    price: 5,
    request: 'Other request',
    expanded : false,
  },
];

function ApproveLoans() {
  return (
    <div>
      <Typography variant="h4" component="h4" style={{ marginTop: '1rem' }}>
        Approve Loans
      </Typography>
      <Center>
        {suppliers.map((e) => {
          return (
            <MyCard supplier={e} />
          );
        })}
      </Center>
    </div>
  );
}

export default ApproveLoans;
