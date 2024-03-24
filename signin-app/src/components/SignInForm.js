import React, { useState, useRef } from 'react';
import './SignIn.css';
import FormInput from './FormInput';
import { directive } from '@babel/types';

//upload image assets into an assets folder:
// import user_icon from 'Assets/user.png'

const SignInForm = () => {

 //   const [username, setUsername] = useState('');


    const usernameRef = useRef()
    
    console.log("re-rendered")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(usernameRef)
    }


    return (
        <div> 
            <form onSubmit={handleSubmit}>
                <FormInput refer={usernameRef} placeholder='username'></FormInput>
                <FormInput placeholder='email'></FormInput>
                <FormInput placeholder='password'></FormInput>
                <button>Submit</button>
            </form>
        </div>
    )
}

// const SignInForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

// //   const [formData, setFormData] = useState({
// //     username: 'default',
// //     email: 'default@gmail',
// //     password: 'enter here',
// //   })

//   const [formError, setFormError] = useState({
//     email: '', // Initialize error state
//   });

//   const handleSignIn = (event) => {
//     console.log(event)
//     setEmail(() => ({
//         ...email,
//         [event.target.name]: event.target.value
//     }))
//     // setFormData(() => ({
//     //     ...formData,
//     //     [event.target.name]: event.target.value,
//     // }))
//   };

// //   const onChangeHandler = (event) => {
// //     const { name, value } = event.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   }

//   const onSubmitHandler = (event) => {
//     event.preventDefault()
//     console.log("Email: ", email)
//     console.log("Password: ", password)
//   //  console.log("Form data: ", formData)
//     let isValid = validateForm()
//     console.log(isValid)
//   }

//   const validateForm = () => {
//     let err = {};
//     // if (formData.email === ""){
//     if (email === ""){
//         err.username = 'Username required!'
//     }
//     setFormError({ ...err })
//     return Object.keys(err).length === 0; // Return true if no errors
//     //return false;
//   }

//   return (
//     <div className="sign-in-container">
//       <h2>Sign In</h2>
//       <form onSubmit = {onSubmitHandler}>
//         <label>Email:</label>
//         <input
//           type="email"
//          value={email}
//          onChange={(e) => setEmail(e.target.value)}
//         //  onChange={onChangeHandler} 
//         //  value={formData.email}
//         />
//         <span className='non-valid'>
//             {formError.email}
//         </span>

//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         // onChange={onChangeHandler} 
//         //  value={formData.password}
//         />

//         <button type="button" onClick={handleSignIn}>
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

export default SignInForm;
