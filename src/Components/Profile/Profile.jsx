// import "./Profile.css";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  updateDoc,
  doc,
  collection,
  where,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dogitem from "../DogItem/Dogitem";

function Profile() {
  const auth = getAuth();
  const [dogs, setDogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [deleteIcon, setDeleteIcon] = useState(false);
  const { name, email } = formData;

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //Update in firease
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });

        toast.success("Woof! Details Updated", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Couldn't update details", {
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
    } catch (error) {
      toast.error("Could not update profile details", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (dogId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "dogs", dogId));
      const updatedDogs = dogs.filter((dog) => dog.id !== dogId);
      setDogs(updatedDogs);
      toast.success("Dog deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const profileDisplayName = name ? (
    changeDetails ? null : (
      <p className="">Hello, {name}</p>
    )
  ) : null;

  useEffect(() => {
    const fetchUserDogs = async () => {
      const dogsRef = collection(db, "dogs");

      const q = query(dogsRef, where("userRef", "==", auth.currentUser.uid));

      const querySnapshot = await getDocs(q);

      const dogs = [];

      querySnapshot.forEach((doc) => {
        return dogs.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setDogs(dogs);
      setLoading(false);
      setDeleteIcon(true);
    };

    fetchUserDogs();
  }, [auth.currentUser.uid]);

  return (
    <>
      <Navbar />
      <div className="personal-details">
        <div className="p-4">
          {profileDisplayName}
          {changeDetails ? (
            <div className="personal-details-container">
              <p>Personal details</p>
              <form className=" flex flex-col update-form-container">
                <label>Name: </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs mt-3"
                  id="name"
                  value={name}
                  placeholder="Name"
                  onChange={onChange}
                  disabled={!changeDetails}
                />

                <label className="mt-3"> Email: </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs mt-3"
                  id="email"
                  placeholder="email"
                  value={email}
                  onChange={onChange}
                  disabled={!changeDetails}
                />
              </form>
            </div>
          ) : null}

          <div className="flex gap-4 mb-4 mt-4">
            {/* Change details button */}
            <button
              className="btn bg-neutral-950 hover:bg-neutral-950 md:bg-neutral-500 text-white"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? "Done" : "Change Profile Details"}
            </button>

            {/* Cancel Button */}
            {changeDetails ? (
              <button
                className="btn btn-error cancel"
                onClick={() => {
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>

          <div className="flex jusify-evenly gap-4 sell-and-signOut-buttons ">
            <NavLink
              to="/sell-dog"
              className="btn bg-neutral-950 hover:bg-neutral-950 md:bg-neutral-500 text-white "
            >
              Sell a Dog
            </NavLink>
            <NavLink
              className="btn bg-neutral-950 hover:bg-neutral-950 md:bg-neutral-500 text-white"
              to="/sign-out"
            >
              Sign Out
            </NavLink>
          </div>
        </div>
      </div>

      {!loading && dogs?.length > 0 && (
        <div className="user-dogs mt-4 ">
          <h6 className="text-center text-dark text-bold">Your dogs</h6>
          <main>
            <div className="flex justify-center justify-evenly flex-wrap gap-4">
              {dogs.map((dog) => {
                return (
                  <Dogitem
                    dog={dog.data}
                    id={dog.id}
                    key={dog.id}
                    deleteIcon={deleteIcon}
                    onDelete={() => onDelete(dog.id)}
                  />
                );
              })}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default Profile;
