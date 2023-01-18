import reviewsReducer from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotReviews } from "../../store/reviews";
import { useEffect } from "react";

export const AllSpotReviews = () => {
  const dispatch = useDispatch();

  const oldAllReviews = useSelector((state) => state.reviews.spot);

  const allReviews = Object.values(oldAllReviews);

  console.log(allReviews);

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(loadSpotReviews(spotId));
  }, [spotId, dispatch]);

  return (
    <div className="spot-reviews-container">
      <h1>Updated Review component here</h1>
    </div>
  );
};

export default AllSpotReviews;
