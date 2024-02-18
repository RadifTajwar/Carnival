import {CgMouse} from 'react-icons/cg'
import './Home.css'
import ProductCard from './ProductCard'
import MetaData from "../header/MetaData";
import {clearErrors, getProducts} from "../../../actions/productAction";
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, Fragment} from "react";
import Loader from "../loader/Loader";
import {useAlert} from "react-alert";

const Home = () => {
    const alert = useAlert()

    const dispatch = useDispatch();

    const {loading, error, products} = useSelector(state => state.products);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProducts());
    }, [dispatch, error, alert]);


    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <MetaData title='LuxeLane'/>
                    <div className='banner'>
                        <p>Welcome to LuxeLane!</p>
                        <h1>Find your Necessary Products Here!</h1>
                        <a href='#container'>
                            <button>
                                Scroll <CgMouse/>
                            </button>
                        </a>
                    </div>

                    <h2 className='homeHeading'>Recently Added Products</h2>

                    <div className='container' id='container'>
                        {products && products.map(product => (
                            <ProductCard product={product}/>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home;