import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../../store/spots";
import "./SingleSpotPage.css";
import { SpotPageImgLayout } from "./SpotPageImgLayout";

export const SingleSpotPage = () => {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);

  Object.values(spot);

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  const {
    name,
    description,
    price,
    numReviews,
    SpotImages,
    address,
    city,
    state,
    country,
    avgStarRating,
  } = spot;

  return (
    <div className="SingleSpot-Main-Container">
      <div className="SingleSpot-Name-Rating">
        <h1>{name}</h1>
        <div className="SingleSpot-Rating-Review-Location">
          {`${avgStarRating} stars`},{`${numReviews} reviews`},
          {`${city}, ${state}, ${country}`}
        </div>
      </div>
      <div>
        <SpotPageImgLayout spot={spot} spotImg={SpotImages} />
      </div>
      <h3 className="Hosted-By-Section">Entire home hosted</h3>
      <div className="Single-Spot-Description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SingleSpotPage;
