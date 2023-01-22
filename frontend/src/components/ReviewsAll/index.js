import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotReviews } from "../../store/reviews";
import { CreateNewReviewModal } from "./CreateReviewModal";
import { useEffect, useState } from "react";
import { deleteSpotReview } from "../../store/reviews";
import "./ReviewsAll.css";

export const AllSpotReviews = ({ avgStars }) => {
  const [loadedReviews, setLoadedReviews] = useState(false);
  const [revExpanded, setReviewExpanded] = useState(false);

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const oldAllReviews = useSelector((state) => state.reviews.spot);
  const currUser = useSelector((state) => state.session.user);

  //const currSpot = useSelector((state) => state.spots.singleSpot);

  const allReviews = Object.values(oldAllReviews);

  const avgStars2 = parseFloat(avgStars);

  const newAvgStars = avgStars2.toFixed(2);

  const numOfRev = allReviews.length;

  const specificRev = allReviews.find((rev) => currUser?.id === rev?.userId);

  useEffect(() => {
    dispatch(loadSpotReviews(spotId)).then(() => setLoadedReviews(true));
  }, [dispatch, numOfRev, newAvgStars]);

  const handleDelete = async (e) => {
    await dispatch(deleteSpotReview(specificRev));
  };
  if (!loadedReviews)
    return (
      <div className="blank-review-add-button">
        <CreateNewReviewModal alreadyRev={specificRev} />
      </div>
    );

  return (
    <div className="spot-reviews-container">
      <div className="reviews-header">
        <h3>
          <span>
            {newAvgStars == "NaN" ? " " : newAvgStars}
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
        {!specificRev && <CreateNewReviewModal />}
      </div>

      <div className="inner-container-spot-rev">
        {allReviews &&
          allReviews.map(({ stars, User, review, id, createdAt }) => (
            <div className="individual-review-card" key={id}>
              <div className="name-plus-date">
                <div className="name-and-icon-rev">
                  <i className="fa-solid fa-user-pen"></i> {User.firstName}
                </div>
                <div className="date-banner-review">
                  {" · "}
                  {createdAt.slice(5, 7)} {createdAt.slice(4, 5)}{" "}
                  {createdAt.slice(0, 4)}
                </div>
              </div>
              <div className="review-text">
                <p className="review-text-p">{review}</p>
                <div className="trashcan-container">
                  {User.id === currUser?.id && (
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={handleDelete}
                      id="trashcan-Reviews"
                    ></i>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllSpotReviews;
