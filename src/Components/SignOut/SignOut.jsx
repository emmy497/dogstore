import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import "./SignOut.css";
import { NavLink } from "react-router-dom";

function SignOut() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
  });

  const { name } = formData;

  const Signout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <>
      <Navbar />

      <div className="home-card card w-60 md:w-96 md:my-auto bg-base-100 shadow-xl mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title "> Hello, {name}</h2>
         
          <p>Are you sure you want to leave?</p>

          <div className="card-actions">
            <NavLink to="/buy-dog">
              <button className="btn bg-neutral-950 text-white" onClick={Signout}>
                Sign Out
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignOut;
