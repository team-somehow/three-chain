import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "@arcana/auth-react";
import { arcanaProvider } from "../index";
import { LoanContractAddress } from "../constants/constants";
import LoanAbi from "../artifacts/contracts/Loan.sol/Loan.json";
import { Contract, ethers, providers } from "ethers";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Button {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

function MyCard(props) {
    console.log(props);
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(LoanContractAddress, LoanAbi.abi, signer);
    const [expanded, setExpanded] = React.useState(false);
    const auth = useAuth();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function loanApprove() {
        await updateDoc(doc(db, "RequestedLoans", props.id), {
            repayWalletAddress: auth?.user?.address,
            loanStatus: "Approved",
        });
        await arcanaProvider.connect();
        let num = 0.05;
        await contract.giveLoan({
            value: ethers.utils.parseEther(num.toString()),
        });

        console.log("Loan Approved");
    }
    useEffect(() => {
        console.log(props);
    }, [props]);

    return (
        <Card sx={{ width: 600, marginBottom: 2 }}>
            <CardHeader title={props.name} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Tenure : {props.tenure}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Interest : {props.interest}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Link to={`/chat/${props.manufacturerId}`}>
                    <Button aria-label="add to favorites" variant="contained">
                        <ChatIcon /> Chat
                    </Button>
                </Link>
                <Button
                    aria-label="share"
                    onClick={loanApprove}
                    variant="contained"
                    color="success"
                    sx={{ ml: 1 }}
                >
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
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Details:</Typography>
					<Typography paragraph>Product : {product}</Typography>
					<Typography paragraph>Quantity : {quantity}</Typography>
					<Typography paragraph>Price : {price}</Typography>
					<Typography>Request : {request}</Typography>
				</CardContent>
			</Collapse> */}
        </Card>
    );
}

export default MyCard;
