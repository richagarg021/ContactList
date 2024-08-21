import React from "react";
import "./LandingNavbar.css";
import {NavLink} from "react-router-dom";

function LandingNavbar(){
    return (
        <>
            <div className="navbar">
                <div className="projectName">Contact Application</div>
                <div className="landing-page-links">
                    <div className="link-div">
                        <div><NavLink className="link" to="/login">LOGIN</NavLink></div>
                    </div>
                    <div className="link-div">
                        <div><NavLink className="link" to="/signup">SIGNUP</NavLink></div>
                    </div>
                    
                </div>
            </div>


        </>
    );
}
export default LandingNavbar;