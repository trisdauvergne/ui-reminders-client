import React from 'react';
import {
  Link
} from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
        <Link to="/createlist">Create list</Link>
        <br />
        <Link to="/viewlists">View lists</Link>
    </nav>
  )
}

export default Navbar