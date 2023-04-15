import * as React from 'react';
import Typography from '@mui/material/Typography';
import RegulateBatches from '../../src/components/RegulateBatches';
import Center from '../components/utils/Center';

const suppliers = [
  {
    name: 'Pargat Singh',
    id: 1,
    quantity: 100,
    status: 0,
  },
  {
    name: 'Vinay Kanse',
    id: 2,
    quantity: 1000,
    status: 1,
  },
];

function Regulator() {
  return (
    <Center height='auto'>
      <Typography variant="h4" component="h4" style={{ margin: '1rem 0' }}>
        My Batches
      </Typography>
      {suppliers.map((e) => {
        return <RegulateBatches supplier={e} />;
      })}
    </Center>
  );
}

export default Regulator;
