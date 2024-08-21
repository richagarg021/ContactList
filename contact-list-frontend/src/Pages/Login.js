import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { login } from "../services/userService";
import { doLogin } from "../auth";
import Navbar from "../components/Navbar";
import LandingNavbar from "../components/LandingNavbar";


function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try{
        const response = await login(userData);

        //save token to localStorage
        doLogin(response, () =>{
            console.log("login detail is saved to localstorage");
        })  
        alert("Logged in Successfully !");
        navigate('/user/contacts');
        console.log(response);
    }
    catch(error){
        alert(error.response?.data);
        console.log(error.response?.data);
    }
  };

  return (
    <>
      <LandingNavbar/>
      <div className="loginForm">
          <form onSubmit={userLogin} className="form-box">
            <h2 className="heading">Login</h2>

            <div className="input-box">
              <label for="email-field" className="label">
                Email
              </label>
              <input
                id="email-field"
                className="field"
                name="username"
                type="email"
                placeholder="Enter your email"
                required
                onChange={(event) => {
                  setUserData({ ...userData, email: event.target.value });
                }}
                value={userData.email}
              />
            </div>

            <div className="input-box">
              <label for="password-field" className="label">
                Password
              </label>
              <input
                id="password-field"
                className="field"
                name="password"
                type="password"
                placeholder="Enter password"
                required
                onChange={(event) => {
                  setUserData({ ...userData, password: event.target.value });
                }}
                value={userData.password}
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
            <div className="signup">
              <p>Don't have an Account? </p>
              <Link to="/signup" type="submit" class="signup-link">
                Register
              </Link>
            </div>
          </form>
      </div>
    </>
  );
}

export default Login;
