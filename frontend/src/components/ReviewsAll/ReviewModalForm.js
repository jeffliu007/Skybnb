import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotReviews } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

export const ReviewModalForm = ({ alreadyRev }) => {
  // const [errors, setErrors] = useState([]);
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);
  const currUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const spotId = useSelector((state) => state.spots.singleSpot.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(alreadyRev);

    const newUserInfo = {
      User: currUser,
      ReviewImages: [],
    };

    const newReview = {
      review: comments,
      stars: rating,
    };

    return dispatch(createSpotReviews(spotId, newReview, newUserInfo))
      .then(closeModal)
      .then(history.push(`/spots/${spotId}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors([data.errors]);
      });
  };

  if (!currUser) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h2>New Review</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Comments:
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          />
        </label>
        <label>
          Star Rating
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Choose 1-5</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewModalForm;
