import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
// import "./SellDog.css";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import { db } from "../../firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function SellDog() {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    price: "",
    images: {},
  });
  const [loading, setLoading] = useState(false);

  const { name, breed, price, images } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const options = [
    {
      label: "Bulldog",
      value: "Bulldog",
    },
    {
      label: "German Shepherd",
      value: "German Shepherd",
    },
    {
      label: "Pitbull",
      value: "Pitbull",
    },
  ];

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    //Store images to firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imageUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    const docRef = await addDoc(collection(db, "dogs"), formDataCopy);
    setLoading(false);

    toast.success("Dog details saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate(`/breed/${formDataCopy.breed}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // text/boolean/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar />

      <main className="sell-dog-container">
        <form
          className="form flex flex-col text-center items-center"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <h4>Sell a Dog</h4>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onMutate}
            maxLength="20"
            minLength="3"
          />

          <input
            type="number"
            className="input input-bordered w-full max-w-xs mt-3"
            id="price"
            placeholder="Price"
            value={price}
            onChange={onMutate}
            max="20000"
            min="100"
          />

          <select
            id="breed"
            onChange={onMutate}
            className="select select-bordered w-full max-w-xs mt-3"
          >
            <option disabled selected>
              Select Breed
            </option>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

          <label className="mt-3 images">
            <h6>Images</h6>
          </label>
          <input
            type="file"
            className="form-control mt-2"
            id="images"
            placeholder="Images"
            onChange={onMutate}
            max="6"
            accept=".jpg, .png, .jpeg"
            multiple
            required
          />

          <p className=" mt-2 image-text">
            {" "}
            The first image will be the cover <br /> (max 6)
          </p>

          <button className=" btn btn-wide btn-dark b-color mt-3 w-50">
            Sell
          </button>
        </form>
      </main>
    </div>
  );
}

export default SellDog;
