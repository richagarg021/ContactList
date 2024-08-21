import React from "react";
import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { signup } from "../services/userService";
import LandingNavbar from "../components/LandingNavbar";

function Register(){

    const [userData, setUserData] = useState({
        name:'',
        email:'',
        password:'',
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateField = (field, value) => {
        const validationErrors = {...errors};
        switch(field) {
            case 'name':
                if(!value.trim()) {
                    validationErrors.name = "Name is required!";
                } else if(/[\d]/.test(value)) {
                    validationErrors.name = "Name should not contain numbers!";
                } else {
                    delete validationErrors.name;
                }
                break;
            case 'email':
                if(!value.trim()) {
                    validationErrors.email = "Email is required!";
                } else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|in)/.test(value)) {
                    validationErrors.email = "Email is not valid!";
                } else {
                    delete validationErrors.email;
                }
                break;
            case 'password':
                if(!value.trim()) {
                    validationErrors.password = "Password is required!";
                } else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/.test(value)) {
                    validationErrors.password = "Password should be strong (at least 8 characters with uppercase, lowercase, digit, and special character).";
                } else {
                    delete validationErrors.password;
                }
                break;
            default:
                break;
        }
        setErrors(validationErrors);
    };
 
    const userSignUp =async (e)=>{

        e.preventDefault();

        if(Object.keys(errors).length ===0 ){
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
            <LandingNavbar/>
            <div className="registrationForm">
            <div className="form-box">
            <form action="" onSubmit={userSignUp}>
                <h2 className="heading">Register</h2>

                <div className="input-box">
                    <label for="name-field" className="label">Your Name</label>
                    <input id="name-field" className="field" maxLength="25" placeholder="Enter your name" 
                    onChange={(event)=>{
                        validateField('name', event.target.value);
                        setUserData({...userData, name:event.target.value});
                    }} 
                    value={userData.name} required />
                    {errors.name && <span className="errorMessage">{errors.name}</span>}         
                </div> 

                <div className="input-box">
                    <label for="email-field" className="label">Email</label>
                    <input id="email-field" className="field" maxLength = "30" placeholder="Enter your email" 
                    onChange={(event)=>{
                        validateField('email', event.target.value);
                        setUserData({...userData, email:event.target.value});
                    }}
                    value={userData.email} required/>
                    {errors.email && <span className="errorMessage">{errors.email}</span>}           
                </div> 

                <div className="input-box">
                    <label for="password-field"className="label">Password</label>
                    <input id="password-field" className="field" type="password" placeholder="Enter password"
                    onChange={(event)=>{
                        validateField('password', event.target.value);
                        setUserData({...userData, password:event.target.value});
                    }} 
                    value={userData.password} required/>
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