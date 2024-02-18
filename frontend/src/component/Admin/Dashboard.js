import React, {useEffect} from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
// import {Doughnut, Line} from "react-chartjs-2";
// import {Chart as ChartJS, LinearScale, PointElement, ArcElement, CategoryScale, registerables} from "chart.js";
import {useSelector, useDispatch} from "react-redux";
import {getAdminProducts, clearErrors} from "../../actions/productAction";
import {getAllOrders} from "../../actions/orderAction.js";
// import {getAllUsers} from "../../actions/userAction.js";
import MetaData from "../layout/header/MetaData";
import {useAlert} from "react-alert";
import {getAllUsers} from "../../actions/userAction";

// ChartJS.register(registerables) //problematic
// ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement)

const Dashboard = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, products} = useSelector((state) => state.products);

    const {orders} = useSelector((state) => state.allOrders);

    const {users} = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products &&
    products.forEach((item) => {
        if (item.drug_stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }


        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [alert, dispatch, error]);

    let totalAmount = 0;
    orders &&
    orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });

    // const lineState = {
    //     labels: ["Initial Amount", "Amount Earned"],
    //     datasets: [
    //         {
    //             label: "TOTAL AMOUNT",
    //             backgroundColor: ["tomato"],
    //             hoverBackgroundColor: ["rgb(197, 72, 49)"],
    //             data: [0, totalAmount],
    //         },
    //     ],
    // };
    //
    // const doughnutState = {
    //     labels: ["Out of Stock", "In Stock"],
    //     datasets: [
    //         {
    //             backgroundColor: ["#00A6B4", "#6800B4"],
    //             hoverBackgroundColor: ["#4B5000", "#35014F"],
    //             data: [outOfStock, products.length - outOfStock],
    //         },
    //     ],
    // };

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel"/>
            <Sidebar/>

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br/> ৳ {totalAmount.toFixed(2)}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                {/*<div className="lineChart">*/}
                {/*    <Line data={lineState}/>*/}
                {/*</div>*/}

                {/*<div className="doughnutChart">*/}
                {/*    <Doughnut data={doughnutState}/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export {Dashboard};