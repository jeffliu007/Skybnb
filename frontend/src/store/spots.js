import { csrfFetch } from "./csrf";

const ADD_SPOT = "spots/ADD_SPOT";

const LOAD_ALLSPOTS = "spots/LOAD_ALLSPOTS";

const LOAD_SINGLESPOT = "spots/LOAD_SINGLESPOT";

// reg actions

export const addSpot = (spot, url) => {
  return {
    type: ADD_SPOT,
    spot,
    url,
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

export const createSpot = (spot, payload) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  let body = await res.json();
  let url = payload.url;
  if (res.ok) {
    const newRes = await csrfFetch(`/api/spots/${body.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await dispatch(addSpot(body, url));
  }
  return body;
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
      shallowState.singleSpot = {
        ...action.spot,
      };
      return shallowState;
    }
    default:
      return state;
  }
};

export default spotReducer;
