import React from 'react';
import { Box, Typography } from '@mui/material';
import LogDetails from '../../components/LogDetails';

const details = [
  {
    name: 'Batch 1',
    id: 1,
    from: 'Punjab',
    to: 'Mumbai',
    status: 0,
    time : '12:30 PM'
  },
  {
    name: 'Batch 2',
    id: 2,
    from: 'Goa',
    to: 'Delhi',
    status: 2,
    time : '06:30 PM'
  },
  {
    name: 'Batch 3',
    id: 3,
    from: 'Shimla',
    to: 'Delhi',
    status: 1,
    time : '10:00 AM'
  },
];

function DetailsLog() {
  return (
    <Box>
      <Typography variant="h4" component="h4" style={{ margin: '1rem 0' }}>
        Get Details
      </Typography>
      {details.map((e) => {
        return <LogDetails details={e} />;
      })}
    </Box>
  );
}

export default DetailsLog;
