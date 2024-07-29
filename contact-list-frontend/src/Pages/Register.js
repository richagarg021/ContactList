import React from "react";
import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { signup } from "../services/userService";

function Register(){

    const [userData, setUserData] = useState({
        name:'',
        email:'',
        password:'',
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
 
    const userSignUp =async (e)=>{

        e.preventDefault();
        const validationErrors = {};
        if(!userData.name.trim()){
            validationErrors.name = "Name is required!"
        }
        else if(!/^(?!.*\d).*$/.test(userData.name)){
            validationErrors.name = "name should not be contain numbers!"
        }

        if(!userData.email.trim()){
            validationErrors.email = "Email is required!"
        }else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|in)/.test(userData.email)){
            validationErrors.email = "email is not valid!"
        }

        if(!userData.password.trim()){
            validationErrors.password = "Password is required!"
        }else if(userData.password.length < 8){
            validationErrors.password = "password should be at least 8 characters!"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length ===0 ){
            try{
                const response = await signup(userData);
                setUserData({name: '', email : '', password: ''});
                alert(response.data);
                navigate('/login');
            }
            catch(error){
                alert(error.response?.data);
            }
        }
        
    };

    return (
        <>
            <div className="registrationForm">
            <div className="form-box">
            <form action="" onSubmit={userSignUp}>
                <h2 className="heading">Register</h2>

                <div className="input-box">
                    <label for="name-field" className="label">Your Name</label>
                    <input id="name-field" className="field"  placeholder="Enter your name" 
                    onChange={(event)=>{
                        setUserData({...userData, name:event.target.value});
                    }} 
                    value={userData.name} />
                    {errors.name && <span className="errorMessage">{errors.name}</span>}         
                </div> 

                <div className="input-box">
                    <label for="email-field" className="label">Email</label>
                    <input id="email-field" className="field" placeholder="Enter your email" 
                    onChange={(event)=>{
                        setUserData({...userData, email:event.target.value});
                    }}
                    value={userData.email} />
                    {errors.email && <span className="errorMessage">{errors.email}</span>}           
                </div> 

                <div className="input-box">
                    <label for="password-field"className="label">Password</label>
                    <input id="password-field" className="field" type="password" placeholder="Enter password"
                    onChange={(event)=>{
                        setUserData({...userData, password:event.target.value});
                    }} 
                    value={userData.password} />
                    {errors.password && <span className="errorMessage">{errors.password}</span>}           
                </div>

                <button type="submit" className="register-btn">Register</button>
                <div className="login">
                    <p>Already have an Account? </p>
                    <Link to="/login" type="submit" class="login-link">
                        Login
                    </Link>
                </div>
            </form>
            
            </div>
            </div>
        </>
    );
}
export default Register;