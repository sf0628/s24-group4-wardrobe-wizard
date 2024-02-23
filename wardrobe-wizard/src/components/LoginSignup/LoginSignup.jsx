import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginSignup.css";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {
    // represents if user is in the Sign in or Login page
    const [action, setAction] = useState("Login");
    // represents data collected on the form
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // represents the error message (if a field is left blank)
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    // represents if the user pressed 'submit' successfully 
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const isFormValid = () => {
        if (action === "Login") {
            return formData.email.trim() !== '' && formData.password.trim() !== '';
        } else {
            return formData.username.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '';
        }
    };

    const handleSubmit = () => {
        if (isFormValid()) {
           // setShowErrorMessage(false);
            localStorage.setItem('formData', JSON.stringify(formData));
            console.log('Form data saved:', formData);

            // Navigate to /mycloset page
            if (!formSubmitted) {
                setFormSubmitted(true);
                navigate("/mycloset");
            }
        } else {
            setShowErrorMessage(true);
            console.log('Please fill out all required fields');
        }
    };

    const handleChange = () => {
        setShowErrorMessage(false);
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> : <div className="input">
                    <img src={user_icon} alt="" />
                    <input
                        placeholder="Name"
                        type="text"
                        value={formData.username}
                        onChange={(e) => { setFormData({ ...formData, username: e.target.value });
                        handleChange();}}
                    />
                </div>}

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            handleChange();
                        }}
                    />
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => { setFormData({ ...formData, password: e.target.value });
                        handleChange();}}
                    />
                </div>

                {action === "Sign up" ? <div></div> : <div className="forgot-password">
                    Forgot Password? <span>Click here.</span>
                </div>}

                {/* <div className="error-container">
                {showErrorMessage && (
                            <div className="error-message">Please fill out all required fields</div>
                        )}
                </div> */}

                <div className="submit-container">
                    <div className="error-container"
                    //  onChange={() => {showErrorMessage("")}}
                    >
                        {showErrorMessage && (
                                    <div className="error-message">Please fill out all required fields</div>
                                )}
                    </div>

                    <div className="submit-btn" onClick={handleSubmit} 
                         disabled={!isFormValid()}>
                            Submit
                    </div>
                </div>

                <div className="log-or-signin-container">
                    <div className={action === "Login" ? "submit" : "submit gray"} 
                        onClick={() => {
                            setAction("Login");
                            setFormSubmitted(false); // Reset the formSubmitted flag when switching actions
                        }}
                        >Login
                    </div>
                    <div className={action === "Sign up" ? "submit" : "submit gray"} 
                    onClick={() => {
                        setAction("Sign up");
                        setFormSubmitted(false); // Reset the formSubmitted flag when switching actions
                    }}>Sign up
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginSignup;

