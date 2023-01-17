import { NavLink } from "react-router-dom";
import "./HomePage.css";

export const SpotCards = ({ spot }) => {
  let { id, city, state, price, name, avgRating, previewImage } = spot;

  if (previewImage && previewImage === "No images uploaded yet")
    previewImage =
      "https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=2000";

  return (
    <NavLink className={"SpotCardsContainer"} to={`/spots/${id}`} key={name}>
      <div className="cardMain">
        <div className="img-holder">
          <img src={previewImage} className="prevImg" />
        </div>
        <div className="cardContents">
          <div className="card-Location-Rating">
            {`${city}, ${state}`}
            <div className="card-Rating">{avgRating}</div>
          </div>
          <div className="cardName">{name}</div>
          <div className="cardPrice">{`${price} night`}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default SpotCards;
