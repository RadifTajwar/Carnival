import React, {Fragment} from "react";
import "./About.css";
import MetaData from "../layout/header/MetaData";

const About = () => {
    return (
        <Fragment>
            <MetaData title='LuxeLane'/>
            <div className="about-container">
                <div className="about-content">
                    <h1>About Our Online Shop</h1>
                    <p>Welcome to our online store, your go-to destination for high-quality products and a seamless
                        shopping experience. We are dedicated to providing a wide range of products to meet your needs
                        and preferences.</p>
                    <p>Our mission is to ensure that you have a convenient and enjoyable shopping experience, with a
                        focus on customer satisfaction. With years of experience in the retail industry, we have
                        established ourselves as a reliable and customer-centric online shop.</p>
                    <p>Why Choose Us:</p>
                    <div className="feature-list">
                        <div className="feature-item">
                            <p><span className="feature-icon">✓</span> Diverse Selection: We offer a diverse range of
                                products, from everyday essentials to unique and specialized items, all sourced from
                                reputable suppliers.</p>
                        </div>
                        <div className="feature-item">
                            <p><span className="feature-icon">✓</span> Quality Assurance: Your satisfaction is our
                                priority. We ensure that all products meet high-quality standards and exceed your
                                expectations.</p>
                        </div>
                        <div className="feature-item">
                            <p><span className="feature-icon">✓</span> Customer Support: Our dedicated customer support
                                team is available to assist you with any questions and provide guidance throughout your
                                shopping journey.</p>
                        </div>
                        <div className="feature-item">
                            <p><span className="feature-icon">✓</span> Easy Ordering: Our user-friendly platform makes
                                ordering your favorite products a breeze. Simply browse, select, and order with ease.
                            </p>
                        </div>
                        <div className="feature-item">
                            <p><span className="feature-icon">✓</span> Secure Payment: We prioritize the security of
                                your online transactions and offer secure payment options to safeguard your personal and
                                financial information.</p>
                        </div>
                        <div className="feature-item">
                            <p><span className="feature-icon">✓</span> Swift Delivery: We strive to deliver your orders
                                promptly, ensuring you receive your products in a timely manner.</p>
                        </div>
                    </div>
                    <p>Thank you for choosing us as your online shopping destination. We are committed to providing you
                        with a delightful experience and meeting your needs with excellence.</p>
                </div>
            </div>
        </Fragment>
    );
};

export default About;
