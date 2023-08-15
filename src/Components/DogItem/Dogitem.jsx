import { useLocation } from "react-router-dom";

function Dogitem({ dog, id, deleteIcon, onDelete }) {
  return (
    <>
      <div class="card w-60 md:w-72 lg:w-96 bg-base-100 shadow-lg ">
        <figure className="px-10 pt-10">
          <img src={dog.imageUrls[0]} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{dog.name}</h2>
          <p>{dog.breed}</p>
          <div className="card-actions">
            <button className="btn bg-neutral-950 text-white">
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
