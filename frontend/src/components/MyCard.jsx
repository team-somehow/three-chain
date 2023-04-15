import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <Button {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function MyCard({
  supplier: {
    name,
    aadhar,
    tenure,
    interest,
    product,
    quantity,
    price,
    request,
    id,
  },
}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function loanApprove(){
    console.log('Loan Approved');
  }


  return (
    <Card sx={{ width: 600, marginBottom: 2 }}>
      <CardHeader title={name} subheader={aadhar} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Quantity : {aadhar}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tenure : {tenure}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interest : {interest}
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
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>Product : {product}</Typography>
          <Typography paragraph>Quantity : {quantity}</Typography>
          <Typography paragraph>Price : {price}</Typography>
          <Typography>Request : {request}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default MyCard;
