import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
// import "./SignUp.css"

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name,
        });

        const formDataCopy = { ...formData };
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        setDoc(doc(db, "users", user.uid), formDataCopy);

        toast.success("Woof! Account Created", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Bad user credentials");
      });
  };

  return (
    <>
      <main className="signup-card card p-4 w-96 bg-base-100 shadow-xl">
        <form
          className="form flex flex-col text-center items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="h3 mb-3 fw-normal text-center">Welcome</h1>

          <div className=" mb-4">
            <input
              type="name"
              className="input input-bordered w-full max-w-xs "
              id="name"
              placeholder="name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              id="email"
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </div>
          <div className=" mb-4">
            <input
              type="password"
              className="input input-bordered w-full max-w-xs "
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <h6 className="mt-5 mb-2 text-center">Already have an account?</h6>

          <NavLink className="text-secondary" to="/sign-in">
            <h6 className="text-neutral">Sign In</h6>
          </NavLink>
          <button className="btn btn-wide btn-dark b-color mt-3 w-50" type="submit">
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
}

export default SignUp;
