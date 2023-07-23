import React, {useState} from "react";
import "./Navbar.css";
import { NavLink, Route } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-[1] p-5 shadow bg-base-100 rounded-box w-52">
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/profile">
          <p className="mt-4">Profile</p>
        </NavLink>
        <NavLink to="/sign-out">
          <p className="mt-4">Sign Out</p>
        </NavLink>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <a className="btn btn-ghost normal-case text-xl">Dogs247</a>
    </div>
  
  </div>
  )
}

export default Navbar;
