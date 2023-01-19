import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotReviews } from "../../store/reviews";
import { CreateNewReviewModal } from "./CreateReviewModal";
import { useEffect, useState } from "react";
import { deleteSpotReview } from "../../store/reviews";
import "./ReviewsAll.css";

export const AllSpotReviews = ({ avgStars }) => {
  const [loadedReviews, setLoadedReviews] = useState(false);

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const oldAllReviews = useSelector((state) => state.reviews.spot);
  const currUser = useSelector((state) => state.session.user);

  const allReviews = Object.values(oldAllReviews);

  const avgStars2 = parseFloat(avgStars);

  const newAvgStars = avgStars2.toFixed(2);

  const numOfRev = allReviews.length;

  const specificRev = allReviews.find((rev) => rev.userId === currUser.id);

  useEffect(() => {
    dispatch(loadSpotReviews(spotId)).then(() => setLoadedReviews(true));
  }, [dispatch]);

  const handleDelete = (e) => {
    return dispatch(deleteSpotReview(specificRev));
  };

  if (!loadedReviews) return null;

  return (
    <div className="spot-reviews-container">
      <div className="reviews-header">
        <h3>{`${newAvgStars == "NaN" ? "No ratings yet" : newAvgStars} ·
        ${
          numOfRev === undefined || numOfRev == "NaN"
            ? "No Reviews yet"
            : numOfRev === 1
            ? numOfRev + " Review"
            : numOfRev + " Reviews"
        }`}</h3>

        <CreateNewReviewModal />

        <button onClick={handleDelete}>Delete</button>
      </div>

      <div className="inner-container-spot-rev">
        {allReviews.map(({ stars, User, review, id }) => (
          <div className="individual-review-card" key={id}>
            <div>{User.firstName} add Icon here</div>
            <div>
              review comments
              <p>{review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSpotReviews;
