import React, {Fragment} from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import {useSelector} from "react-redux";
import MetaData from "../layout/header/MetaData";
import "./ConfirmOrder.css";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.product_price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 50;

    const tax = subtotal * 0.174; // increased 2.4% from 15%

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment");
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order"/>
            <CheckoutSteps activeStep={1}/>
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.product_image} alt="Product"/>
                                        <Link to={`/product/${item.product}`}>
                                            {item.product_name}
                                        </Link>{" "}
                                        <span>
                      {item.quantity} X ৳ {item.drug_price} ={" "}
                                            <b>৳ {(item.product_price * item.quantity).toFixed(2)}</b>
                    </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>৳ {subtotal.toFixed(2)}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>৳ {shippingCharges}</span>
                            </div>
                            <div>
                                <p>VAT:</p>
                                <span>৳ {tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>৳ {totalPrice.toFixed(2)}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export {ConfirmOrder};