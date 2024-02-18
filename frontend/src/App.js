import './App.css';
import Header from './component/layout/header/Header'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './component/layout/footer/Footer'
import Home from './component/layout/Home/Home'
import WebFont from 'webfontloader'
import {useEffect, useState} from "react";
import ProductDetails from './component/Product/ProductDetails'
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from './store'
import {loadUser} from "./actions/userAction";
import UserOptions from "./component/layout/header/UserOptions";
import {useSelector, useDispatch} from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import {Profile} from "./component/User/Profile";
import {UpdateProfile} from "./component/User/UpdateProfile";
import {UpdatePassword} from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import {Shipping} from "./component/Cart/Shipping";
import {ConfirmOrder} from "./component/Cart/ConfirmOrder";
import axios from "axios";
import {Payment} from "./component/Cart/Payment"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {OrderSuccess} from "./component/Cart/OrderSuccess"
import {MyOrders} from "./component/Order/MyOrders"
import {OrderDetails} from "./component/Order/OrderDetails";
import {Dashboard} from "./component/Admin/Dashboard"
import {ProductList} from "./component/Admin/ProductList";
import {NewProduct} from "./component/Admin/NewProduct";
import {UpdateProduct} from "./component/Admin/UpdateProduct";
import {OrderList} from "./component/Admin/OrderList";
import {UsersList} from "./component/Admin/UserList";
import {ProcessOrder} from "./component/Admin/ProcessOrder";
import {UpdateUser} from "./component/Admin/UpdateUser";
import {ProductReviews} from "./component/Admin/ProductReviews";
import Contact from "./component/Contact/Contact"
import About from "./component/About/About"

function App() {

    const {isAuthenticated, user} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const {data} = await axios.get("/api/v1/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
    }


    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });


        store.dispatch(loadUser())
        getStripeApiKey();
    }, [dispatch])

    // window.addEventListener("contextmenu", (e) => e.preventDefault());

    return (
        <Router>
            <Header/>
            {isAuthenticated && <UserOptions user={user}/>}
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact-us' element={<Contact/>}/>
                <Route path='/product/:id' element={<ProductDetails/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path='/products/:keyword' element={<Products/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/login' element={<LoginSignUp/>}/>
                <Route path='/account' element={<ProtectedRoute component={Profile}/>}/>
                <Route path='/me/update' element={<ProtectedRoute component={UpdateProfile}/>}/>
                <Route path='/password/update' element={<ProtectedRoute component={UpdatePassword}/>}/>
                <Route path='/password/forgot' element={<ForgotPassword/>}/>
                <Route path='/password/reset/:token' element={<ResetPassword/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/shipping' element={<ProtectedRoute component={Shipping}/>}/>

                {stripeApiKey && (
                    <Route path='/process/payment' element={
                        <Elements stripe={loadStripe(stripeApiKey)}>
                            <ProtectedRoute component={Payment}/>
                        </Elements>
                    }/>
                )}

                <Route path='/success' element={<ProtectedRoute component={OrderSuccess}/>}/>
                <Route path='/orders' element={<ProtectedRoute component={MyOrders}/>}/>


                <Route path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder}/>}/>
                <Route path='/order/:id' element={<ProtectedRoute component={OrderDetails}/>}/>

                <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} component={Dashboard}/>}/>
                <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} component={ProductList}/>}/>
                <Route path='/admin/product' element={<ProtectedRoute isAdmin={true} component={NewProduct}/>}/>
                <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} component={UpdateProduct}/>}/>
                <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true} component={OrderList}/>}/>
                <Route path='/admin/users' element={<ProtectedRoute isAdmin={true} component={UsersList}/>}/>
                <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} component={UpdateUser}/>}/>
                <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} component={ProcessOrder}/>}/>
                <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true} component={ProductReviews}/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;