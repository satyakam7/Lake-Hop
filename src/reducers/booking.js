import {createReducer} from 'reduxsauce';
import Types from '../actions/actionTypes';
import {Status} from '../constants';

export const initialState = {
  createBookingStatus: Status.NONE,
  updateBookingStatus: Status.NONE,
  getBookingStatus: Status.NONE,
  getBookingsStatus: Status.NONE,
  destroyBookingStatus: Status.NONE,

  bookings: [],
  booking: null,
  newBooking: null,

  errorMessage: null,
};

///////////////////// Create Booking /////////////////////
const createBookingRequest = state => ({
  ...state,
  createBookingStatus: Status.REQUEST,
});

const createBookingSuccess = (state, action) => ({
  ...state,
  createBookingStatus: Status.SUCCESS,
  newBooking: action.payload.booking,
});

const createBookingFailure = (state, action) => ({
  ...state,
  createBookingStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Update Booking /////////////////////
const updateBookingRequest = state => ({
  ...state,
  updateBookingStatus: Status.REQUEST,
});

const updateBookingSuccess = (state, action) => ({
  ...state,
  updateBookingStatus: Status.SUCCESS,
});

const updateBookingFailure = (state, action) => ({
  ...state,
  updateBookingStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Get Booking /////////////////////
const getBookingRequest = state => ({
  ...state,
  getBookingStatus: Status.REQUEST,
});

const getBookingSuccess = (state, action) => ({
  ...state,
  getBookingStatus: Status.SUCCESS,
  booking: action.payload.booking,
});

const getBookingFailure = (state, action) => ({
  ...state,
  getBookingStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Get Bookings /////////////////////
const getBookingsRequest = state => ({
  ...state,
  getBookingsStatus: Status.REQUEST,
});

const getBookingsSuccess = (state, action) => ({
  ...state,
  getBookingsStatus: Status.SUCCESS,
  bookings: action.payload.bookings,
});

const getBookingsFailure = (state, action) => ({
  ...state,
  getBookingsStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Destroy Booking /////////////////////
const destroyBookingRequest = state => ({
  ...state,
  destroyBookingStatus: Status.REQUEST,
});

const destroyBookingSuccess = (state, action) => ({
  ...state,
  destroyBookingStatus: Status.SUCCESS,
});

const destroyBookingFailure = (state, action) => ({
  ...state,
  destroyBookingStatus: Status.FAILURE,
  errorMessage: action.error,
});

const actionHandlers = {
  [Types.CREATE_BOOKING_REQUEST]: createBookingRequest,
  [Types.CREATE_BOOKING_SUCCESS]: createBookingSuccess,
  [Types.CREATE_BOOKING_FAILURE]: createBookingFailure,

  [Types.UPDATE_BOOKING_REQUEST]: updateBookingRequest,
  [Types.UPDATE_BOOKING_SUCCESS]: updateBookingSuccess,
  [Types.UPDATE_BOOKING_FAILURE]: updateBookingFailure,

  [Types.GET_BOOKING_REQUEST]: getBookingRequest,
  [Types.GET_BOOKING_SUCCESS]: getBookingSuccess,
  [Types.GET_BOOKING_FAILURE]: getBookingFailure,

  [Types.GET_BOOKINGS_REQUEST]: getBookingsRequest,
  [Types.GET_BOOKINGS_SUCCESS]: getBookingsSuccess,
  [Types.GET_BOOKINGS_FAILURE]: getBookingsFailure,
};

export default createReducer(initialState, actionHandlers);
