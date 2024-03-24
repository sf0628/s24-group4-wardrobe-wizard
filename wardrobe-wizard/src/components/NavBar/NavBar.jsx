import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><a href="/">Home</a></li>
        <li><a href="/generateOutfit">Generate Outfit</a></li>
        <li><a href="/myWardrobe">My Wardrobe</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
