import { csrfFetch } from "./csrf";

const LOAD_SELF_BOOKINGS = "booking/LOAD_SELF_BOOKINGS";

const LOAD_SPOT_BOOKINGS = "booking/LOAD_SPOT_BOOKINGS";

const ADD_BOOKING = "booking/ADD_BOOKING";

const UPDATE_BOOKING = "booking/UPDATE_BOOKING";

const DELETE_BOOKING = "booking/DELETE_BOOKING";

const normalizeFunc = (bookings) => {
  const normalizedData = {};
  bookings.forEach((booking) => (normalizedData[booking.id] = booking));

  return normalizedData;
};

// action creators
export const loadSelfBookings = (userId, bookings) => {
  return {
    type: LOAD_SELF_BOOKINGS,
    userId,
    bookings,
  };
};

export const loadSpotBookings = (spotId, bookings) => {
  return {
    type: LOAD_SPOT_BOOKINGS,
    spotId,
    bookings,
  };
};

export const addBooking = (spotId, booking) => {
  return {
    type: ADD_BOOKING,
    spotId,
    booking,
  };
};

export const editBooking = (bookingId, booking) => {
  return {
    type: UPDATE_BOOKING,
    bookingId,
    booking,
  };
};

export const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId,
  };
};

// thunk actions
export const fetchSelfBookings = (userId) => async (dispatch) => {
  const res = await csrfFetch("/api/bookings/current");

  if (res.ok) {
    const bookings = await res.json();
    dispatch(loadSelfBookings(userId, bookings));
    return bookings;
  }
};

export const fetchSpotBookings = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (res.ok) {
    const bookings = await res.json();
    dispatch(loadSpotBookings(spotId, bookings));
    return bookings;
  }
};

export const createBooking = (spotId, booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (res.ok) {
    const newBooking = await res.json();

    dispatch(addBooking(spotId, newBooking));
    return newBooking;
  }
};

export const updateBooking = (bookingId, booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (res.ok) {
    const editedBooking = await res.json();
    dispatch(editBooking(bookingId, editedBooking));
    return editedBooking;
  }
};

export const removeBooking = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const deletedBooking = await res.json();
    dispatch(deleteBooking(bookingId));
    return deletedBooking;
  }
};

const initialState = {
  spot: {},
  user: {},
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SELF_BOOKINGS: {
      const newState = { ...state };
      if (action.bookings.Bookings) {
        newState.user = normalizeFunc(action.bookings.Bookings);
      } else {
        return { ...state, user: null };
      }
      return newState;
    }
    case LOAD_SPOT_BOOKINGS: {
      const newState = { ...state };
      if (action.bookings.Bookings) {
        newState.spot = normalizeFunc(action.bookings.Bookings);
      } else {
        return { ...state, spot: null };
      }
      return newState;
    }
    case ADD_BOOKING: {
      const newState = { ...state };
      newState.spot = {
        ...state.spot,
        [action.booking.id]: action.booking,
      };

      return newState;
    }
    case UPDATE_BOOKING: {
      const newState = { ...state };
      newState.spot = {
        ...state.spot,
        [action.bookingId]: {
          ...state.user[action.bookingId],
          startDate: action.booking.startDate,
          endDate: action.booking.endDate,
        },
      };
      newState.spot = {
        ...state.user,
        [action.bookingId]: {
          ...state.user[action.bookingId],
          startDate: action.booking.startDate,
          endDate: action.booking.endDate,
        },
      };

      return newState;
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState.spot[action.bookingId];
      delete newState.user[action.bookingId];

      return newState;
    }
    default:
      return state;
  }
}
