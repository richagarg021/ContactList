import React from "react";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

function LandingPage(){


    return (
        <>
            <div className="landingPage"></div>
            <div className="content">
                <h1 className="contactUs">Contact Application</h1>
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="getStarted">
                        <div><NavLink className="home-link" to="/user/contacts" >GET STARTED</NavLink></div>
                </div>
            </div>
        </>
    );
}
export default LandingPage;