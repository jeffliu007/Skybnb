import { useState } from "react";

export const ReviewModalForm = () => {
  const [errors, setErrors] = useState([]);
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState("");

  return (
    <div>
      <h2>New Review</h2>
      <form>
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
          <input
            value={rating}
            type="range"
            min="1"
            max="5"
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

export default ReviewModalForm;
