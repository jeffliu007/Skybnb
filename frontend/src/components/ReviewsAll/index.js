import reviewsReducer from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotReviews } from "../../store/reviews";
import { CreateNewReviewModal } from "./CreateReviewModal";
import { useEffect } from "react";
import "./ReviewsAll.css";

export const AllSpotReviews = ({ avgStars }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const oldAllReviews = useSelector((state) => state.reviews.spot);

  const allReviews = Object.values(oldAllReviews);

  const avgStars2 = parseFloat(avgStars);

  const newAvgStars = avgStars2.toFixed(2);

  const numOfRev = allReviews.length;

  useEffect(() => {
    dispatch(loadSpotReviews(spotId));
  }, [spotId, dispatch, allReviews, numOfRev]);

  if (!oldAllReviews) return null;

  return (
    <div className="spot-reviews-container">
      {/* <h1>{`${newAvgStars == "NaN" ? "No ratings yet" : newAvgStars} ·
       ${
         numOfRev === undefined || numOfRev == "NaN"
           ? "No Reviews yet"
           : numOfRev === 1
           ? numOfRev + " Review"
           : numOfRev + " Reviews"
       }`}</h1> */}
      <div className="reviews-header">
        <h3>{`${
          newAvgStars == "NaN" ? "No ratings yet" : newAvgStars + " Stars"
        } ${numOfRev + " Review/s"}`}</h3>
        <CreateNewReviewModal />
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
