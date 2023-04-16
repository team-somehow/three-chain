import React from 'react';
import { Grid } from '@mui/material';

function MyGrid({left = "Left", right = "Right"}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {left}
      </Grid>
      <Grid item xs={12} md={6}>
        {right}
      </Grid>
    </Grid>
  );
}

export default MyGrid;
