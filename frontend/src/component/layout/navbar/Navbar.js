import React from "react";
import {AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai'
import {RxPerson} from 'react-icons/rx'
import "./Navbar.css"
import {useSelector} from "react-redux";


const Navbar = () => {

    const {isAuthenticated} = useSelector(state => state.user)

    return (
        <div className="html-container">
            <div className="html-section">
                <div className="html-project">
                    <div className="navigation">
                        <nav>
                            <ul className="nav-type">
                                <li>
                                    <a href="/" className="active"><span
                                        className="company-name">LuxeLane</span></a>
                                </li>
                                <li>
                                    <a href="/products" className="active1">Products</a>
                                </li>
                                <li>
                                    <a href="/about" className="active2">About</a>
                                </li>
                                <li>
                                    <a href="/contact-us" className="active3">Contact Us</a>
                                </li>
                                <li>
                                    <a href="/search" className="active1"><AiOutlineSearch/></a>
                                </li>
                                <li>
                                    <a href="/cart" className="active2"><AiOutlineShoppingCart/></a>
                                </li>
                                {!isAuthenticated &&
                                    <li>
                                        <a href="/login" className="active3"><RxPerson/></a>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;