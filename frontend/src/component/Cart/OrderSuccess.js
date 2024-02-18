import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./OrderSuccess.css";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon/>

            <Typography>Congratulations, Your Order has been Placed Successfully!</Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export {OrderSuccess};