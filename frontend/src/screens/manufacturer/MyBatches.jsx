import * as React from 'react';
import Typography from '@mui/material/Typography';
import Batches from '../../components/Batches';

const suppliers = [
  {
    name: 'Batch 1',
    id: 1,
    quantity: 100,
    status: 0,
  },
  {
    name: 'Batch 2',
    id: 2,
    quantity: 1000,
    status: 1,
  },
];

function MyBatches() {
  return (
    <div style={{paddingLeft : 20}}>
      <Typography variant="h4" component="h4" style={{ margin: '1rem 0' }}>
        My Batches
      </Typography>
        {suppliers.map((e) => {
          return (
            <Batches supplier={e} />
          );
        })}
    </div>
  );
}

export default MyBatches;
