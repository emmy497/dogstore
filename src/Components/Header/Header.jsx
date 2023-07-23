import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import "./Header.css";

function Header() {
  const { loggedIn } = useAuthStatus();
  return (
    <div>
      <div className="header-section">
        {/* You can open the modal using ID.showModal() method */}

        <button className="btn" onClick={() => window.my_modal_3.showModal()}>
          Available Breeds
        </button>
        <NavLink to={loggedIn ? "/sell-dog" : "/sign-in"}>
          <button className="btn btn-outline-dark">Sell a Dog</button>
        </NavLink>
      </div>

      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box d-flex">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg text-center mb-4">
            Available Breeds
          </h3>
          <NavLink to="/breed/Pitbull">
            <button className="btn btn-active btn-neutral mx-3">Pitbull</button>
          </NavLink>
          <NavLink to="/breed/German Shepherd">
            <button className="btn btn-active btn-neutral mx-3">
              German Shepherd
            </button>
          </NavLink>
          <NavLink to="/breed/Bulldog">
            <button className="btn btn-active btn-neutral">Bulldog</button>
          </NavLink>
        </form>
      </dialog>
    </div>
  );
}

export default Header;
