import { NavLink } from "react-router-dom";
import "./HomePage.css";
import { useEffect } from "react";

export const SpotCards = ({ spot }) => {
  let { id, city, state, price, name, avgRating, previewImage, url } = spot;
  let roundedAvgRating = avgRating?.toFixed(2);

  // if (roundedAvgRating.length < 0) return null;

  if (previewImage && previewImage === "No images uploaded yet")
    previewImage =
      "https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=2000";

  return (
    <NavLink
      className={"SpotCardsContainer"}
      to={`/spots/${id}`}
      key={name}
      id="removeNavLink-UnderLines"
    >
      <div className="cardMain">
        <div className="img-holder">
          <img src={previewImage} className="prevImg" />
        </div>
        <div className="cardContents">
          <div className="card-Location-Rating">
            <div className="only-location">{`${city}, ${state}`}</div>
            <div className="card-Rating">
              <span>{!avgRating ? " " : <i className="fas fa-star"></i>}</span>
              {roundedAvgRating == "NaN" ? " " : roundedAvgRating}
            </div>
          </div>
          <div className="cardPrice">
            <span className="span-price-bold-price" style={{ fontWeight: 700 }}>
              ${price}{" "}
            </span>
            <span className="span-night">night</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default SpotCards;
