import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { createSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const SpotModalForm = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState("");
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  //use effect2

  // useEffect(() => {
  //   let formValidationErr = [];

  //   if (!address) formValidationErr.push("Address required");

  //   setErrors(formValidationErr);
  // }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const body = {
      name,
      address,
      city,
      state,
      country,
      description,
      price,
      lng: 70.0,
      lat: 90.0,
    };
    console.log(body.url);

    return dispatch(createSpot(body, url))
      .then((res) => history.push(`/spots/${res.id}`))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors([data.errors]);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Url
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SpotModalForm;
