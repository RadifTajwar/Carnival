import React, {Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import './ProductDetails.css'
import {useSelector, useDispatch} from 'react-redux'
import {clearErrors, getProductDetails, newReview} from "../../actions/productAction";
import {useParams} from 'react-router-dom'
import ReviewCard from './ReviewCard'
import Loader from '../layout/loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from "../layout/header/MetaData";
import {addItemsToCart} from "../../actions/cartAction"
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@material-ui/core"
import {Rating} from "@mui/material";
import {NEW_REVIEW_RESET} from "../../constants/productConstants";


const ProductDetails = () => {
    const {id} = useParams(); //match.params is age-old so using this to extract
    const alert = useAlert();


    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(state => state.productDetails)
    const {success, error: reviewError} = useSelector(state => state.newReview)


    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")


    const increaseQuantity = () => {
        if (product.product_stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Product Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Added Successfully!");
            dispatch({
                type: NEW_REVIEW_RESET
            })
        }

        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success])


    const options = {
        size: "large",
        value: product.product_rating,
        readOnly: true,
        precision: 0.25
    };

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={`${product.product_name}`}/>
                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {
                                    product.product_images &&
                                    product.product_images.map((item, i) => (
                                        <img
                                            className='CarouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>

                            <div className='detailsblock1'>
                                <h2>{product.product_name} ({product.product_weight}) {product.product_category}</h2>
                                <p>Product #{product._id}</p>
                            </div>

                            <div className="detailsblock22">
                                <Rating {...options}/>
                                <span className="detailsblock22span">{product.product_rating && (product.product_rating).toFixed(2)} ({product.num_of_Reviews} Reviews)</span>
                            </div>

                            <div className='detailsblock3'>
                                <h1>{`৳ ${product.product_price}`}</h1>
                                <div className='detailsblock31'>
                                    <div className='detailsblock311'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type='number'/>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    {' '}
                                    <button disabled={product.product_stock < 1} onClick={addToCartHandler}>Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status : {' '}
                                    <b className={product.product_stock < 1 ? 'redColor' : 'greenColor'}>
                                        {product.product_stock < 1 ? 'Out of Stock' : 'In Stock'}
                                    </b>
                                </p>
                            </div>

                            <div className='detailsblock4'>
                                <p><b>Usage : </b>{product.product_usage}</p>
                                <p><b>Class : </b>{product.product_class}</p>
                                <p><b>Manufacturer : </b>{product.product_manufacturer}</p>
                                <p><b>Storage Condition : </b>{product.storage_conditions}</p>
                            </div>

                            <button onClick={submitReviewToggle} className='submitReview'> Submit Review</button>

                        </div>
                    </div>

                    <h3 className='reviewsHeading'>Reviews</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>


                    {product.product_reviews && product.product_reviews[0] ? (
                        <div className='reviews'>
                            {product.product_reviews && product.product_reviews.map((review) => <ReviewCard
                                review={review}/>)}
                        </div>
                    ) : (
                        <p className='noReviews'> No Reviews Yet!</p>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails;