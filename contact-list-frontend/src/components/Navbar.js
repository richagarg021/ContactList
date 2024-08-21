import React from "react";
import "./Navbar.css";
import {NavLink} from "react-router-dom";

function Navbar(){


    return(
        <>
            <div className="navbar">
                <div className="projectName">Contact Application</div>
                <div className="links">
                    <div className="linkDiv">
                        <div><NavLink className="link" to="/user/contacts" >HOME</NavLink></div>
                    </div>
                    {/* <div className="linkDiv">
                        <div><NavLink className="link" to="/login">LOGIN</NavLink></div>
                    </div>
                    <div className="linkDiv">
                        <div><NavLink className="link" to="/signup">SIGNUP</NavLink></div>
                    </div> */}
                    <div className="linkDiv">
                        <div><NavLink className="link" to="/logout">LOGOUT</NavLink></div>
                    </div>
                </div>
            </div>


        </>
    );
}
export default Navbar;