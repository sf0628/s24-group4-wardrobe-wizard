import React, { useState, useEffect } from "react";
import "../../components/MyWardrobe/MyWardrobe";
// import { useNavigate } from "react-router-dom";
// import "./loginSignup.css";
// import user_icon from '../Assets/person.png'
// import email_icon from '../Assets/email.png'
// import password_icon from '../Assets/password.png'

// const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>')


import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


const LoginSignup = () => {

    const supabase = createClient('https://ivksivkepfmrbgwvlqny.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2a3NpdmtlcGZtcmJnd3ZscW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyOTc4NDMsImV4cCI6MjAyNjg3Mzg0M30.MEA_BDrynBMJ9UGjMLIRFqdNraI5TMMxWinumEaGpu4')

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchClothingItems();
      }, [user, fetchClothingItems]); 
      

  // Function to handle user login
//   const handleLogin = async () => {
//     try {
//       const { user, error } = await supabase.auth.signIn(/* Provide login credentials */);

//       if (error) {
//         throw error;
//       }

//       setUser(user);

//       // Fetch user data after successful login
//       const userData = await fetchUserData();
//       // Pass user data to MyCloset component
//       // You might need to adjust this depending on how you handle routing and passing props
//       // For simplicity, I'm assuming MyCloset is rendered immediately after login
//       // and the user data is passed as a prop
//       return <MyWardrobe user={userData} />;
//     } catch (error) {
//       console.error('Error signing in:', error.message);
//     }
//   };
const handleLogin = async () => {
    try {
      // Your login logic...

      // After successful login, render MyWardrobe component passing user data as prop
      return <MyWardrobe user={userData} />;
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  // Function to fetch user data from Supabase
//   const fetchUserData = async () => {
//     try {
//       // Assuming you have already authenticated the user
//       const user = supabase.auth.user();

//       if (user) {
//         // Fetch additional user data from Supabase
//         const { data, error } = await supabase
//           .from('users')
//           .select('*')
//           .eq('id', user.id); // Assuming 'id' is the column name for user IDs

//         if (error) {
//           throw error;
//         }

//         // Assuming the query returns only one user data object
//         const userData = data[0]; // Extract the first item from the data array

//         return userData;
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error.message);
//       return null;
//     }

//     return(
//   <Auth
//     supabaseClient={supabase}
//     appearance={{ theme: ThemeSupa }}
//     providers={['google', 'facebook', 'twitter']}
//   />)
// };

// const LoginSignup = () => {å
//     // represents if user is in the Sign in or Login page
//     const [action, setAction] = useState("Login");
//     // represents data collected on the form
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });

//     // represents the error message (if a field is left blank)
//     const [showErrorMessage, setShowErrorMessage] = useState(false);
//     // represents if the user pressed 'submit' successfully 
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const navigate = useNavigate();

//     const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2a3NpdmtlcGZtcmJnd3ZscW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyOTc4NDMsImV4cCI6MjAyNjg3Mzg0M30.MEA_BDrynBMJ9UGjMLIRFqdNraI5TMMxWinumEaGpu4';

//     const isFormValid = () => {
//         if (action === "Login") {
//             return formData.email.trim() !== '' && formData.password.trim() !== '';
//         } else {
//             return formData.username.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '';
//         }
//     };

//     const handleChange = (e) => {
//         console.log(e.target)
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();

//     try {
//         const response = await fetch('https://ivksivkepfmrbgwvlqny.supabase.co', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             // Optionally, you can add the API key here as well
//             // 'Authorization': `Bearer ${apiKey}`
//           },
//           body: JSON.stringify({ ...formData, apiKey: apiKey })
//         });
  
//         if (response.ok) {
//           // Login successful
//           const data = await response.json();
//           // Handle successful login, e.g., store token in local storage, redirect, etc.
//         } else {
//           // Login failed
//           const errorData = await response.json();
//           console.error('Login failed:', errorData.message); // Adjust error handling as needed
//         }
//       } catch (error) {
//         console.error('Error during login:', error); // General error handling
//       }
//     };

//     return (
//         <div className='container'>
//             <div className="header">
//                 <div className="text">{action}</div>
//                 <div className="underline"></div>
//             </div>
//             <div className="inputs">
//                 {action === "Login" ? <div></div> : <div className="input">
//                     <img src={user_icon} alt="" />
//                     <input
//                         placeholder="Name"
//                         type="text"
//                         value={formData.username}
//                         onChange={(e) => { setFormData({ ...formData, username: e.target.value });
//                    ;}}
//                     />
//                 </div>}

//                 <div className="input">
//                     <img src={email_icon} alt="" />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={formData.email}
//                         onChange={(e) => {
//                             setFormData({ ...formData, email: e.target.value });
                
//                         }}
//                     />
//                 </div>

//                 <div className="input">
//                     <img src={password_icon} alt="" />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={(e) => { setFormData({ ...formData, password: e.target.value });
//                        }}
//                     />
//                 </div>

//                 <div className="error-container"
//                     //  onChange={() => {showErrorMessage("")}}
//                     >
//                         {showErrorMessage && (
//                                     <div className="error-message">Please fill out all required fields</div>
//                                 )}
//                 </div>

//                 {action === "Sign up" ? <div></div> : <div className="forgot-password">
//                     Forgot Password? <span>Click here.</span>
//                 </div>}

                

//                 <div className="log-or-signin-container">
//                     <div className={action === "Login" ? "submit" : "submit gray"} 
//                         onClick={() => {
//                             setAction("Login");
//                             setFormSubmitted(false); // Reset the formSubmitted flag when switching actions
//                         }}
//                         >Login
//                     </div>
//                     <div className={action === "Sign up" ? "submit" : "submit gray"} 
//                     onClick={() => {
//                         setAction("Sign up");
//                         setFormSubmitted(false); // Reset the formSubmitted flag when switching actions
//                     }}>Sign up
//                     </div>
//                 </div>

//                 <div className="submit-container">
//                         <div className="submit-btn" onClick={handleSubmit} 
//                          disabled={!isFormValid()}>
//                             Submit
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
}


export default LoginSignup;

