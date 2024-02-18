import React, {Fragment, useEffect, useState} from "react";
import './Products.css'
import {useSelector, useDispatch} from 'react-redux'
import {clearErrors, getProducts} from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import ProductCard from "../layout/Home/ProductCard";
import {useAlert} from "react-alert";
import {useParams} from "react-router-dom";
import Pagination from 'react-js-pagination'
import {Typography} from "@mui/material";
import {Slider} from "@mui/material";
import MetaData from "../layout/header/MetaData";

//drug categories
const categories = [
    "A",
    "B"
];


const Products = () => {
    const {keyword} = useParams();
    const alert = useAlert();

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const {
        products,
        loading,
        error,
        productCount,
        resultPerPage,
        filteredProductCount
    } = useSelector(state => state.products)


    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    const categoryChangeHandler = (event) => {
        setCategory(event.target.value)
    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));
    }, [dispatch, keyword, currentPage, price, category, rating, error, alert]);


    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title='LuxeLane Products'/>
                    <div className='filterBox'>
                        <div className="filterBoxPrice">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay='auto'
                                min={0}
                                max={20}
                                style={{color: 'green'}}
                            />
                        </div>

                        <fieldset className="filterBoxRating">
                            <Typography component='legend'>Ratings Above</Typography>
                            <Slider
                                value={rating}
                                onChange={(e, newRating) => {
                                    setRating(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay='auto'
                                style={{color: 'green'}}
                            />

                        </fieldset>

                        <div className='dropdown-container'>
                            <Typography>Category</Typography>
                            <select value={category} onChange={categoryChangeHandler} className='dropdown-select'>
                                <option value="">Select a Category</option>
                                {categories.map((category) => (
                                    <option value={category} key={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <h2 className='productsHeading'>Products</h2>
                        <div className='products'>
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>

                    </div>


                    {resultPerPage < filteredProductCount && (
                        <div className='paginationBox'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText='Next'
                                prevPageText='Previous'
                                firstPageText='First'
                                lastPageText='Last'
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products;