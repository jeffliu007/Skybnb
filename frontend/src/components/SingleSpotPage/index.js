import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot, removeSpot } from "../../store/spots";
import "./SingleSpotPage.css";
import { SpotPageImgLayout } from "./SpotPageImgLayout";
import EditSpotModal from "../SingleSpotEditModal";
import AllSpotReviews from "../ReviewsAll";

export const SingleSpotPage = () => {
  const [loadedImage, setloadedImage] = useState(false);
  const [ownedUser, setOwnedUser] = useState(false);
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const spotArr = Object.values(spot);
  const currUser = useSelector((state) => state.session.user);
  const oldAllReviews = useSelector((state) => state.reviews.spot);
  const allReviews = Object.values(oldAllReviews);
  const numOfRev = allReviews?.length;
  const history = useHistory();
  const { spotId } = useParams();

  const specificRev = allReviews.find((rev) => rev);

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
    Owner,
  } = spot;
  console.log("num review", numReviews, "type of", typeof numReviews);
  console.log("->>>>>>>>");
  console.log("numofRev", numOfRev, "type of", typeof numOfRev);

  const handleDelete = (e) => {
    dispatch(removeSpot(spotId)).then(() => history.push("/"));
  };

  function randomNumGen() {
    return Math.floor(Math.random() * 6) + 1;
  }

  let roundedAvgStar = avgStarRating?.toFixed(2);

  if (!loadedImage) return null;
  else
    return (
      <div className="SingleSpot-Main-Container">
        <div className="SingleSpot-Name-Rating">
          <h1>{name}</h1>
          <div className="SingleSpot-Rating-Review-Location">
            <div className="reviews-header">
              <div className="starPlusRev">
                {numReviews ? (
                  <h3 className="starPlusRev2">
                    <span>
                      {roundedAvgStar == "NaN" ? " " : roundedAvgStar}
                      <i className="fas fa-star"></i> ·{" "}
                    </span>
                    {numReviews === 1
                      ? numReviews + " Review"
                      : numReviews + " Reviews"}
                  </h3>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="location-header">
              {`${city}, ${state}, ${country}`}
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

            <div className="Hosted-and-Price">
              <div className="Home-Hosted-by-div">
                <h3 className="Hosted-by-Section">
                  Entire home hosted by {Owner?.firstName} · ${price} per night
                </h3>
              </div>
            </div>
            <h4 className="Hosted-Footer">{`${randomNumGen()} guests - ${randomNumGen()} bedrooms - ${randomNumGen()} beds - ${randomNumGen()} baths`}</h4>
            <div className="SS-spot-icons">
              spot icons
              <div>self check in</div>
              <div>superhost</div>
              <div>great location</div>
            </div>
            <div className="SS-insurance">
              insurance<div className="SS-inner-insurance">inner insurance</div>
            </div>
            <div className="descriptionPtag">
              <p>{description}</p>
            </div>
          </div>
          <div className="Reviews-Container">
            <AllSpotReviews avgStars={avgStarRating} />
          </div>
        </div>
      </div>
    );
};

export default SingleSpotPage;
