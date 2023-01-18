import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot, removeSpot } from "../../store/spots";
import "./SingleSpotPage.css";
import { SpotPageImgLayout } from "./SpotPageImgLayout";
import EditSpotModal from "../SingleSpotEditModal";

export const SingleSpotPage = () => {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  Object.values(spot);

  const history = useHistory();
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

  const handleDelete = async (e) => {
    await dispatch(removeSpot(spotId)).then(history.push("/"));
  };
  //finish handle delete

  return (
    <div className="SingleSpot-Main-Container">
      <div className="SingleSpot-Name-Rating">
        <h1>{name}</h1>
        <div className="SingleSpot-Rating-Review-Location-Buttons">
          <div className="SingleSpot-Rating-Review-Location">
            {`${avgStarRating} stars`},{`${numReviews} reviews`},
            {`${city}, ${state}, ${country} for an amazing $${price} per night`}
          </div>
          <div className="edit-and-delete">
            <div className="deleteSpot">
              <button onClick={(e) => handleDelete()}>Delete Spot</button>
            </div>
            <div className="editSpot">
              <EditSpotModal />
            </div>
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
    </div>
  );
};

export default SingleSpotPage;
