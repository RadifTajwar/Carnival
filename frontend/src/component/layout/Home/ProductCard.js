import React from "react";
import {Link} from 'react-router-dom'
import {Rating} from "@mui/material"
import './Home.css'


const ProductCard = ({product}) => {

    const options = {
        size: "small",
        value: product.product_rating,
        readOnly: true,
        precision: 0.25
    };

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.product_images[0].url} alt={product.product_name}/>
            <p>{product.product_name}</p>
            {/*<div style={{ display: 'flex', flexDirection: 'column' }}>*/}
            <div>
                <Rating {...options}/>
                <span className="productCardSpan">({`${product.num_of_Reviews}`} Reviews)</span>
            </div>
            <span>{`৳ ${product.product_price}`}</span>
        </Link>
    )
}

export default ProductCard;