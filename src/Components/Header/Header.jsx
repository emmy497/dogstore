import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";

function Header() {
  const { loggedIn } = useAuthStatus();
  return (
    <div>
      <div className="flex justify-center justify-evenly mb-6 mt-6">
        {/* You can open the modal using ID.showModal() method */}

        <button className="btn bg-neutral-950 text-white" onClick={() => window.my_modal_3.showModal()}>
          Available Breeds
        </button>
        <NavLink to={loggedIn ? "/sell-dog" : "/sign-in"}>
          <button className="btn bg-neutral-950 text-white">Sell a Dog</button>
        </NavLink>
      </div>

      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box d-flex">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">Available Breeds</h3>
          <div className="flex flex-wrap  justify-evenly gap-4 mt-4">
            <NavLink to="/breed/Pitbull">
              <button className="btn btn-active btn-neutral ">Pitbull</button>
            </NavLink>
            <NavLink to="/breed/German Shepherd">
              <button className="btn btn-active btn-neutral ">
                German Shepherd
              </button>
            </NavLink>
            <NavLink to="/breed/Bulldog">
              <button className="btn btn-active btn-neutral">Bulldog</button>
            </NavLink>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default Header;
