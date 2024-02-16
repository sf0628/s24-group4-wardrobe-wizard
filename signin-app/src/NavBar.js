import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/mycloset">My Closet</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
