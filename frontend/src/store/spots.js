import { csrfFetch } from "./csrf";

const ADD_SPOT = "spots/ADD_SPOT";

const LOAD_ALLSPOTS = "spots/LOAD_ALLSPOTS";

const LOAD_SINGLESPOT = "spots/LOAD_SINGLESPOT";

const DELETE_SPOT = "spots/DELETE_SPOT";

const UPDATE_SPOT = "spots/UPDATE_SPOT";

// reg actions

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

export const loadAllSpots = (spots) => {
  return {
    type: LOAD_ALLSPOTS,
    spots,
  };
};

export const loadSingleSpot = (spot) => {
  return {
    type: LOAD_SINGLESPOT,
    spot,
  };
};

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spot: spotId,
  };
};

export const editSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

//thunks

export const fetchAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    const allSpots = await res.json();
    await dispatch(loadAllSpots(allSpots));
    return allSpots;
  }
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    await dispatch(loadSingleSpot(spot));
    return spot;
  }
};

export const createSpot = (spot, url) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (res.ok) {
    const spotData = await res.json();
    const newRes = await csrfFetch(`/api/spots/${spotData.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, preview: true }),
    });

    if (newRes.ok) {
      const imageData = await newRes.json();
      spotData.previewImage = imageData.url;
      console.log(spotData, `spotdata`);
      dispatch(addSpot(spotData));
      return spotData;
    }
  }

  return res;
};

export const removeSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (res.ok) dispatch(deleteSpot(spotId));
  return res;
};

export const updateSpot = (updatedSpot, spotDetails) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotDetails.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedSpot),
  });
  if (res.ok) {
    const spotData = await res.json();
    const changedSpot = { ...spotData, ...spotDetails };
    dispatch(editSpot(changedSpot));
    return changedSpot;
  }
  return res;
};

//normalize flatten helper
const normalizeData = (spots) => {
  const spotData = {};
  spots.Spots.forEach((singleSpot) => (spotData[singleSpot.id] = singleSpot));
  return spotData;
};

//reducer

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const spotReducer = (state = initialState, action) => {
  const shallowState = { ...state };
  switch (action.type) {
    case LOAD_ALLSPOTS: {
      shallowState.allSpots = normalizeData(action.spots);
      return shallowState;
    }
    case LOAD_SINGLESPOT: {
      const shallowState2 = { ...state, allSpots: { ...action.spot } };
      shallowState2.singleSpot = { ...action.spot };
      return shallowState2;
    }
    case ADD_SPOT: {
      const shallowState2 = { ...state, singleSpot: {} };
      shallowState2.allSpots[action.spot.id] = action.spot;
      return shallowState2;
    }
    case DELETE_SPOT: {
      const shallowState2 = { ...state, singleSpot: {} };
      shallowState2.allSpots[action.id] = action.spot;
      shallowState2.singleSpot = action.spot;
      return shallowState2;
    }
    case UPDATE_SPOT: {
      const shallowState2 = { ...state, singleSpot: {} };
      shallowState2.singleSpot = action.spot;
      return shallowState2;
    }
    default:
      return state;
  }
};

export default spotReducer;
