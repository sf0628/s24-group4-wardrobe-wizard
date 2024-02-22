import React, { useState } from "react";
import "./loginSignup.css";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

    // useState: react tool that provides a variable (action) and function (setAction) to set data to this variable
    // we are initializing the variable action with the data "Sign up"
    const [action, setAction] = useState("Login");

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                    <img src={user_icon} alt="" />
                    <input placeholder="Name" type="text"/>
                </div>}

                

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>

                {action==="Sign up"?<div></div>:<div className="forgot-password">
                    Forgot Password? <span>Click here.</span>
                </div>}
                
                <div className="submit-container">
                    <div className={action==="Login"?"submit":"submit gray"} onClick={()=>{setAction("Login")}}>Login</div>
                    <div className={action==="Sign up"?"submit":"submit gray"} onClick={()=>{setAction("Sign up")}}>Sign up</div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup