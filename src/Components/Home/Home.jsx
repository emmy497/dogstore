import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { getAuth } from "firebase/auth";
import { NavLink } from "react-router-dom";

function Home() {
  const auth = getAuth();

  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
  });

  const { name } = userData;

  return (
    <div>
      <Navbar />

      <div className="card w-60 md:w-96 md:my-auto bg-base-100 shadow-xl mx-auto ">
        <div className="card-body items-center text-center ">
          <h2 className="card-title">Hi, {name}</h2>
          <p className="">
            Welcome to Dogs247, <br /> Would you like to
          </p>

          <div className="card-actions items-center  flex-col  md:flex-row mt-6">
            <NavLink to="/buy-dog">
              <button className="btn bg-neutral-950 text-whitebg-neutral-950 hover:bg-neutral-950 md:bg-neutral-500 text-white">
                Buy Dog
              </button>
            </NavLink>
            <NavLink to="/sell-dog">
              <button className="btn  bg-neutral-950 hover:bg-neutral-950 md:bg-neutral-500 text-white">
                Sell Dog
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
