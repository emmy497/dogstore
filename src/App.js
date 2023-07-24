import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";

import Home from "./Components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignOut from "./Components/SignOut/SignOut";
import Profile from "./Components/Profile/Profile";
import SellDog from "./Components/SellDog/SellDog";
import BuyDog from "./Components/BuyDog/BuyDog";
import Breed from "./Components/Breed/Breed";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sell-dog" element={<SellDog />} />
          <Route path="buy-dog" element={<BuyDog />} />
          <Route path="/breed/:breedName" element={<Breed />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
