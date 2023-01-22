import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import "./ReviewsAll.css";

export const ReviewModalForm = () => {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const currUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const spotId = useSelector((state) => state.spots.singleSpot.id);
  const oldReviews = useSelector((state) => state.reviews.spot);
  const allReviews = Object.values(oldReviews);
  const alreadyRev = allReviews.find((rev) => currUser?.id === rev?.userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
    };

    const newUserInfo = {
      User: currUser,
      ReviewImages: [],
    };
    return dispatch(createSpotReviews(spotId, newReview, newUserInfo))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors([data.errors]);
        }
      });
  };

  if (!currUser) {
    return (
      <div className="no-Auth">
        <LoginFormModal />
      </div>
    );
  }

  // if (!alreadyRev) {
  //   return <div>already reviewed</div>;
  // }

  return (
    <div className="review-form-container">
      <div className="form-title">New Review</div>
      <form onSubmit={handleSubmit}>
        <ul className="errors-ul">
          {errors.map((error, idx) => (
            <li key={idx} className="errors-li">
              {error}
            </li>
          ))}
        </ul>
        <div className="form-control">
          <label className="review-comments-label">Comments:</label>
          <textarea
            rows="4"
            cols="50"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="form-input-comments"
          >
            Enter your review here...
          </textarea>
        </div>
        <div className="form-input-review-label">
          <div className="star-rating-title">Star Rating</div>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((value) => (
              <i
                key={value}
                id="fas-star"
                className={`fa-regular fa-star ${
                  value <= stars ? "fa-regular fa-star star-selected" : ""
                }`}
                onClick={() => setStars(value)}
              ></i>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button-review">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewModalForm;
