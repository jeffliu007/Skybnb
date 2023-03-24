import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot, removeSpot } from "../../store/spots";
import "./SingleSpotPage.css";
import { SpotPageImgLayout } from "./SpotPageImgLayout";
import EditSpotModal from "../SingleSpotEditModal";
import AllSpotReviews from "../ReviewsAll";
import NewBookingForm from "../BookingsAll";
import OpenModalButton from "../OpenModalButton";

export const SingleSpotPage = () => {
  const [loadedImage, setloadedImage] = useState(false);
  const [ownedUser, setOwnedUser] = useState(false);
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const spotArr = Object.values(spot);
  const currUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const oldAllReviews = useSelector((state) => state.reviews.spot);
  const allReviews = Object.values(oldAllReviews);
  const numOfRev = allReviews?.length;
  const history = useHistory();
  const { spotId } = useParams();

  const specificRev = allReviews.find((rev) => rev);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId)).then(() => setloadedImage(true));
  }, [dispatch, spotId, ownedUser, numOfRev]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

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
                    <span className="starPlusRev2-span">
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
          <div className="Single-Spot-Description-Container">
            <div className="Single-Spot-Description">
              {currUser && currUser?.id === spot?.Owner?.id ? (
                <div className="edit-and-delete">
                  <div className="editSpot">
                    <EditSpotModal />
                  </div>
                  <div className="single-spot-trash-can-div">
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={handleDelete}
                      id="trashcan-Reviews"
                    ></i>
                  </div>
                </div>
              ) : (
                <div> </div>
              )}

              <div className="Hosted-and-Price">
                <div className="Home-Hosted-by-div">
                  <h3 className="Hosted-by-Section">
                    Entire home hosted by {Owner?.firstName}
                  </h3>
                </div>
              </div>
              <h4 className="Hosted-Footer">{`${randomNumGen()} guests - ${randomNumGen()} bedrooms - ${randomNumGen()} beds - ${randomNumGen()} baths`}</h4>
              <div className="SS-spot-container">
                <div className="SS-spot-icons">
                  <div className="wifi-container">
                    <span className="wifi-span">
                      <i className="fa-solid fa-wifi"></i>{" "}
                      <div className="sss">
                        Free wifi for entire duration of stay
                      </div>
                    </span>{" "}
                  </div>
                  <div className="self-check-in-container">
                    <span className="door-span">
                      <i className="fa-solid fa-door-closed"></i>{" "}
                      <div className="sss">Self check-in</div>
                    </span>{" "}
                  </div>

                  <div className="location-container">
                    <span className="location-span">
                      <i className="fa-solid fa-location-dot"></i>
                      <div className="sss">Great location</div>
                    </span>{" "}
                  </div>
                </div>
                <div className="SS-insurance-container">
                  <div className="skycover-icon">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/skycover-airbnb-clone.png"
                      }
                      className="skycover-img"
                    />
                  </div>
                  <div className="SS-inner-insurance">
                    Every booking includes free protection from Host
                    cancellations, listing inaccuracies, and other issues like
                    trouble checking in.
                  </div>
                </div>
              </div>
              <div className="descriptionPtag">
                <p>{description}</p>
              </div>
            </div>
            <div className="SS-Bookings">
              {currUser ? (
                <div className="SS-Bookings-Container">
                  <NewBookingForm
                    rating={roundedAvgStar}
                    numReviews={numReviews}
                    price={price}
                  />
                </div>
              ) : (
                <div> Login Signup</div>
              )}
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
