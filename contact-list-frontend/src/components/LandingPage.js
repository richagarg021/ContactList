import React from "react";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

function LandingPage(){


    return (
        <>
            <div className="landingPage"></div>
            <div className="content">
                <h1 className="contactUs">Contact Application</h1>
                <p className="text">With our intuitive design and seamless functionality, you'll never miss an opportunity to stay in 
                touch. Dive into a clutter-free world where every contact counts and managing them is as simple as a breeze.</p>
                <div className="getStarted">
                        <div><NavLink className="home-link" to="/user/contacts" >GET STARTED</NavLink></div>
                </div>
            </div>
        </>
    );
}
export default LandingPage;