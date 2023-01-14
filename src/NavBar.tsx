import {
  NavLink
  } from "react-router-dom";
  function Navbar() {
    return (
      <div className="navbar">
        <NavLink className={({ isActive }) => isActive ? 'activeLink' : ''} to='/search'>Search</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'activeLink' : ''} to='/my-favourites'>My Favourites</NavLink>
      </div>
    );
  }
  
  export default Navbar;
  