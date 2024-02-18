import React from "react";
import "./CartItemCard.css";
import {Link} from "react-router-dom";

const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className="CartItemCard">
            <img src={item.product_image} alt="img"/>
            <div>
                <Link to={`/product/${item.product}`}>{item.product_name}</Link>
                <span>{`Price: ৳${item.product_price}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;