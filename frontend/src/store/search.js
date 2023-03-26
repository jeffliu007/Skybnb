import { csrfFetch } from "./csrf";

const GET_SEARCH = "search/GET_SEARCH";

const DELETE_SEARCH = "search/DELETE_SEARCH";

const normalizeFunc = (spots) => {
  const norm = {};
  spots.Spots.forEach((spot) => (norm[spot.id] = spot));
  return norm;
};

const getSearch = (queried_spots) => {
  return {
    type: GET_SEARCH,
    queried_spots,
  };
};

// const deleteSearch = () => {
//   return {
//     type: DELETE_SEARCH,
//   };
// };

export const fetchSearch = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots?location=${query}`);

  if (res.ok) {
    const queried_spots = await res.json();
    dispatch(getSearch(queried_spots));
    return queried_spots;
  }
};

const initialState = {
  search: null,
  suggestions: null,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH: {
      const newState = { ...state };
      newState.search = normalizeFunc(action.queried_spots);
      return newState;
    }
    default:
      return state;
  }
}
