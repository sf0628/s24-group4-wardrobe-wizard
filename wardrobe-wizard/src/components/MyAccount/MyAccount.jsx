import React, { useState, useEffect } from 'react';
import './MyAccount.css'; // Make sure to replace with your CSS file name

const MyAccount = () => {
    // Example state for user data
    const [userData, setUserData] = useState({
        profilePicture: '', // URL of profile picture
        name: '', // User's name
        bio: '' // User's bio
    });

    // Example useEffect to fetch user data
    useEffect(() => {
        // Fetch user data from an API or other source
        // Example:
        // fetchUserData().then(data => setUserData(data));
    }, []);

    return (
        <div className="account-container">
            <div className="profile-info">
                <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
                <h2>{userData.name}</h2>
                <p>{userData.bio}</p>
            </div>
        </div>
    );
}

export default MyAccount;
