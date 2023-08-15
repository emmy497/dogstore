import React from "react";
// import "./BuyDog.css";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import DogsCards from "../DogsCards/DogsCards";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

function BuyDog() {
  const [dogs, setDogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useAuthStatus();

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const dogsRef = collection(db, "dogs");
        const q = query(dogsRef, orderBy("timestamp", "desc"), limit(10));

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
      } catch (error) {
        toast.error("Could not load dogs");
      }
    };

    fetchDogs();
  }, [loading]);

  return (
    <>
      <Navbar />

      <Header />

      <DogsCards dogs={dogs} loading={loading} />
    </>
  );
}

export default BuyDog;
