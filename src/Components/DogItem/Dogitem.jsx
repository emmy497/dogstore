import { useLocation } from "react-router-dom";
import "./DogItem.css";

function Dogitem({ dog, id, deleteIcon, onDelete }) {
  return (
    <>

  <div className="card dog-card w-96 h-96 bg-base-100 shadow-xl mx-4 ">
    <figure className="px-10 pt-10">
      <img src={dog.imageUrls[0]} alt="Shoes" className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{dog.name}</h2>
      <p>{dog.breed}</p>
      <div className="card-actions">
        <button className="btn btn-dark b-color">
        $ {dog.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </button>
        {deleteIcon ? (
            <button
              onClick={() => onDelete(dog.id)}
              className="btn btn-error "
            >
              delete
            </button>
          ) : null}
      </div>
    </div>
  </div>
    </>
  );
}

export default Dogitem;
