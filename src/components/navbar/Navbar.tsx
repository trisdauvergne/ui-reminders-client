import React from 'react';
import {
  Link
} from "react-router-dom";
import './navbar.scss';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__container">
          <Link to="/createlist">Create a list</Link>
          <Link to="/viewlists">View lists</Link>
      </div>
    </nav>
  )
}

export default Navbar