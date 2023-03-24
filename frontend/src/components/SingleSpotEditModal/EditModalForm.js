import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { updateSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EditModalForm.css";

export const EditModalForm = () => {
  const ownedSpot = useSelector((state) => state.spots.singleSpot);
  const [address, setAddress] = useState(ownedSpot.address);
  const [city, setCity] = useState(ownedSpot.city);
  const [state, setState] = useState(ownedSpot.state);
  const [country, setCountry] = useState(ownedSpot.country);
  const [name, setName] = useState(ownedSpot.name);
  const [description, setDescription] = useState(ownedSpot.description);
  const [price, setPrice] = useState(ownedSpot.price);
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const editedBody = {
      name,
      address,
      city,
      state,
      country,
      description,
      price,
      lng: 77.0,
      lat: 99.0,
    };

    const { id, SpotImages, numReviews, avgStarRating, Owner } = ownedSpot;

    const spotDetails = {
      id,
      Owner,
      avgStarRating,
      numReviews,
      SpotImages,
    };

    await dispatch(updateSpot(editedBody, spotDetails))
      .then(history.push(`/spots/${id}`))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="inner-modal-Form2">
      <div className="form-title">Edit your spot</div>
      <form onSubmit={handleSubmit} className="edit-spot-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Home Title
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={1}
            required
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditModalForm;
