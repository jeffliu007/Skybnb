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

//thunks here

export const loadSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const spotData = await res.json();
    dispatch(loadSpotReviewsAction(spotData.Reviews));
  }
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
    default:
      return state;
  }
};

export default reviewsReducer;
