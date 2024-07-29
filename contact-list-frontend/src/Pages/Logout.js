import React, { useEffect } from "react";
import { doLogout } from "../auth";
import { useNavigate } from "react-router-dom";

const Logout = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        doLogout(() => {
            alert("Logged out Successfully!")
            navigate('/login');
        });
    }, []);

    return null;
}
export default Logout;