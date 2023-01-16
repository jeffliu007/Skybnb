import { csrfFetch } from "./csrf";

const ADD_SPOT = "spots/ADD_SPOT";

const LOAD_ALLSPOTS = "spots/LOAD_ALLSPOTS";

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

//thunks

export const fetchAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("api/spots");

  if (res.ok) {
    const allSpots = await res.json();
    await dispatch(loadAllSpots(allSpots));
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
    default:
      return state;
  }
};

export default spotReducer;
