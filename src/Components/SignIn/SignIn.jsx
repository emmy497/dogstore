import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/");

          toast.success("Woof!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        toast.error("Unable to Login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const { email, password } = formData;

  return (
    <>

      <main className="card p-4 w-96 bg-base-100 shadow-xl mx-auto mt-6">
        <form
          className="form flex flex-col text-center items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="h3 mb-3 ">Welcome</h1>
          <div className="mb-4">
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              id="email"
              placeholder="name@example.com"
              onChange={onChange}
            />
          </div>
          <div className=" mb-4">
            <input
              type="password"
              className="input input-bordered w-full max-w-xs "
              id="password"
              placeholder="Password"
              onChange={onChange}
            />
          </div>

          <h6 className="mt-5 mb-2 text-center">Don't have an account?</h6>

          <NavLink  to="/sign-up">
            <h6 className="text-neutral ">Sign up</h6>
          </NavLink>
          <button className="btn btn-wide bg-neutral-950 hover:bg-neutral-950 text-white mt-3 w-50 " type="submit">
            Sign in
          </button>
        </form>
      </main>

   
    </>
  );
}

export default SignIn;
