import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot, removeSpot } from "../../store/spots";
import "./SingleSpotPage.css";
import { SpotPageImgLayout } from "./SpotPageImgLayout";
import EditSpotModal from "../SingleSpotEditModal";
import AllSpotReviews from "../ReviewsAll";
import { resetAll } from "../../store/spots";

export const SingleSpotPage = () => {
  const [loadedImage, setloadedImage] = useState(false);
  const [ownedUser, setOwnedUser] = useState(false);
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const spotArr = Object.values(spot);
  const currUser = useSelector((state) => state.session.user);
  const oldAllReviews = useSelector((state) => state.reviews.spot);
  const allReviews = Object.values(oldAllReviews);
  const numOfRev = allReviews.length;

  const history = useHistory();
  const { spotId } = useParams();

  useEffect(() => {
    // if (currUser && currUser?.id === spot?.Owner?.id) console.log("yes");
    // else console.log("no");

    dispatch(fetchSingleSpot(spotId)).then(() => setloadedImage(true));
  }, [dispatch, spotId, ownedUser, numOfRev]);

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

  const handleDelete = (e) => {
    dispatch(removeSpot(spotId)).then(() => history.push("/"));
  };

  function randomNumGen() {
    return Math.floor(Math.random() * 6) + 1;
  }

  let roundedAvgStar = avgStarRating.toFixed(2);

  if (!loadedImage) return null;
  else
    return (
      <div className="SingleSpot-Main-Container">
        <div className="SingleSpot-Name-Rating">
          <h1>{name}</h1>
          <div className="SingleSpot-Rating-Review-Location-Buttons">
            <div className="SingleSpot-Rating-Review-Location">
              <div className="reviews-header">
                <h3>
                  <span>
                    {roundedAvgStar == "NaN" ? " " : roundedAvgStar}
                    <i className="fas fa-star"></i> ·
                  </span>
                  {`
  ${
    numOfRev === undefined || numOfRev == "NaN"
      ? "No Reviews yet"
      : numOfRev === 1
      ? numOfRev + " Review"
      : numOfRev + " Reviews"
  }`}
                </h3>
              </div>
              {`${city}, ${state}, ${country} for an amazing $${price} per night`}
            </div>
          </div>
          <div>
            <SpotPageImgLayout spot={spot} spotImg={SpotImages} />
          </div>
          <div className="Single-Spot-Description">
            {currUser && currUser?.id === spot?.Owner?.id ? (
              <div className="edit-and-delete">
                <div className="editSpot">
                  <EditSpotModal />
                </div>
                <button onClick={handleDelete} className="CreateFormButton2">
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ) : (
              <div> </div>
            )}
            <h3 className="Hosted-By-Section">Entire home hosted by</h3>
            <h4 className="Hosted-Footer">{`${randomNumGen()} guests - ${randomNumGen()} bedrooms - ${randomNumGen()} beds - ${randomNumGen()} baths`}</h4>
            <p className="descriptionPtag">{description}</p>
          </div>
          <div className="Reviews-Container">
            <AllSpotReviews avgStars={avgStarRating} />
          </div>
        </div>
      </div>
    );
};

export default SingleSpotPage;
