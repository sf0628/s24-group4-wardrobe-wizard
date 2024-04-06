import React, { useState, useEffect } from "react";
import MyCloset, {fetchClothingItems}  from "../../components/MyWardrobe/MyWardrobe";
// import { useNavigate } from "react-router-dom";
// import "./loginSignup.css";
// import user_icon from '../Assets/person.png'
// import email_icon from '../Assets/email.png'
// import password_icon from '../Assets/password.png'

// const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>')

import { createClient } from '@supabase/supabase-js'
import { supabase } from '../MyWardrobe/MyWardrobe'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


const LoginSignup = () => {
    const [user, setUser] = useState(null);
    const [userDatas, setUserDatas] = useState([]); //store multiple user data

    useEffect(() => {
      if (!user) return;
      fetchClothingItems();
      }, [user]); 
      
    const handleLogin = async () => {
      try {
        const userDatas = await fetchUserData(); //fetch data, can be mutiple
        setUserDatas(userDatas); //sets userDatas state with fetched data
      } catch (error) {
        console.error('Error signing in:', error.message);
      }
    };

    const fetchUserData = async () => {
      try {
          const user = supabase.auth.user();
          if (user) {
            const { data, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id);

          if (error) {
              throw error;
          }

          return data; //returns an array of objects
        }
      } catch (error) {
        console.error('Error fetching user data: ', error.message);
        return [];
      }
    };

    return (
      <div>
          <button onClick={handleLogin}>Login</button>
          {userDatas.map((userData, index) => (
              <MyCloset key={index} user={userData} />
          ))}
      </div>
  );


  // Function to fetch user data from Supabase, return <MyCloset user={userData} />;
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
};


export default LoginSignup;

