import { csrfFetch } from "./csrf";

const LOAD_SPOT_REVIEWS = "/reviews/LOAD_SPOT_REVIEWS";

const CREATE_SPOT_REVIEWS = "/reviews/CREATE_SPOT_REVIEWS";

const DELETE_SPOT_REVIEWS = "/reviews/DELETE_SPOT_REVIEWS";

//actions

const loadSpotReviewsAction = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    reviews,
  };
};

const createSpotReviewsAction = (review) => {
  return {
    type: CREATE_SPOT_REVIEWS,
    review,
  };
};

const deleteSpotReviewAction = (review) => {
  return {
    type: DELETE_SPOT_REVIEWS,
    review,
  };
};

//thunks here

export const loadSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const spotData = await res.json();
    dispatch(loadSpotReviewsAction(spotData.Reviews));
    return res;
  }
};

export const createSpotReviews =
  (spotId, review, newUserInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      const body = await res.json();
      const newBody = { ...body, ...newUserInfo };

      await dispatch(createSpotReviewsAction(newBody));
      return res;
    }
  };

export const deleteSpotReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });
  if (res.ok) await dispatch(deleteSpotReviewAction(review));
};

const initialState = {
  spot: {},
  user: {},
};

//reducer
export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT_REVIEWS: {
      const shallowState = { spot: {}, user: {} };
      action.reviews.forEach((rev) => {
        shallowState.spot[rev.id] = rev;
      });
      return shallowState;
    }
    case CREATE_SPOT_REVIEWS: {
      const shallowState = { spot: { ...state.spot }, user: {} };
      shallowState.spot[action.review.id] = action.review;
      return shallowState;
    }
    case DELETE_SPOT_REVIEWS: {
      const shallowState = { spot: { ...state.spot }, user: {} };
      delete shallowState.spot[action.review.id];
      return shallowState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
