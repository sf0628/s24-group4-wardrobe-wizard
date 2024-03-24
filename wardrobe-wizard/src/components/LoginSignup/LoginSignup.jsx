import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginSignup.css";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

// const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>')


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

    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2a3NpdmtlcGZtcmJnd3ZscW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyOTc4NDMsImV4cCI6MjAyNjg3Mzg0M30.MEA_BDrynBMJ9UGjMLIRFqdNraI5TMMxWinumEaGpu4';

    const isFormValid = () => {
        if (action === "Login") {
            return formData.email.trim() !== '' && formData.password.trim() !== '';
        } else {
            return formData.username.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '';
        }
    };

    const handleChange = (e) => {
        console.log(e.target)
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const response = await fetch('https://ivksivkepfmrbgwvlqny.supabase.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Optionally, you can add the API key here as well
            // 'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({ ...formData, apiKey: apiKey })
        });
  
        if (response.ok) {
          // Login successful
          const data = await response.json();
          // Handle successful login, e.g., store token in local storage, redirect, etc.
        } else {
          // Login failed
          const errorData = await response.json();
          console.error('Login failed:', errorData.message); // Adjust error handling as needed
        }
      } catch (error) {
        console.error('Error during login:', error); // General error handling
      }
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
                   ;}}
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
                       }}
                    />
                </div>

                <div className="error-container"
                    //  onChange={() => {showErrorMessage("")}}
                    >
                        {showErrorMessage && (
                                    <div className="error-message">Please fill out all required fields</div>
                                )}
                </div>

                {action === "Sign up" ? <div></div> : <div className="forgot-password">
                    Forgot Password? <span>Click here.</span>
                </div>}

                

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

                <div className="submit-container">
                        <div className="submit-btn" onClick={handleSubmit} 
                         disabled={!isFormValid()}>
                            Submit
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginSignup;

