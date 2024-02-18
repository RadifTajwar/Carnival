import React, {Fragment} from "react";
import "./Contact.css";
import MetaData from "../layout/header/MetaData";

const Contact = () => {
    return (
        <Fragment>
            <MetaData title='LuxeLane'/>
            <div className="contact-container">
                <div className="contact-content">
                    <h1>Contact Us</h1>
                    <p>We're here to assist you. If you have any questions or feedback, please feel free to reach out to
                        us.</p>
                    <div className="contact-form">
                        <div className="input-group">
                            <label>Name:</label>
                            <input type="text"/>
                        </div>
                        <div className="input-group">
                            <label>Email:</label>
                            <input type="email"/>
                        </div>
                        <div className="input-group">
                            <label>Message:</label>
                            <textarea rows="4"></textarea>
                        </div>
                        <button className="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Contact;
