import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { getAuth } from "firebase/auth";
import { NavLink } from "react-router-dom";
import "./Home.css";


function Home() {


   const auth = getAuth();
 
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
  });

  const { name } = userData;

  return (
    <div>
      <Navbar />

      <div className="home-card card w-96 bg-base-100 shadow-xl">
    <div className="card-body items-center text-center">
      
      <h2 className="card-title">Hi, {name}</h2>
      <p className='mt-5'>Welcome to Dogs247 <br />Would you like to</p>
  
      <div className="card-actions">
      <NavLink to="/buy-dog"> <button className="btn btn-dark b-color">Buy Dog</button> </NavLink>
       <NavLink to="/sell-dog"><button className="btn btn-dark b-color">Sell Dog</button></NavLink> 
      </div>
      
    </div>
  </div>
    </div>
  );
}

export default Home;
