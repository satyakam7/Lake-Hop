import {put, call, takeLatest} from 'redux-saga/effects';

import Types from '../actions/actionTypes';
import Messages from '../theme/Messages';
import api from '../api';
const {createBooking, updateBooking, getBooking, getBookings, destroyBooking} =
  api;

function* CreateBooking(action) {
  yield put({type: Types.CREATE_BOOKING_REQUEST});
  try {
    const res = yield call(createBooking, action.payload);
    if (res.booking) {
      yield put({type: Types.CREATE_BOOKING_SUCCESS, payload: res});
    } else {
      yield put({type: Types.CREATE_BOOKING_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.CREATE_BOOKING_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* UpdateBooking(action) {
  yield put({type: Types.UPDATE_BOOKING_REQUEST});
  try {
    const res = yield call(updateBooking, action.payload);
    if (res.bookings) {
      yield put({type: Types.UPDATE_BOOKING_SUCCESS, payload: res});
    } else {
      yield put({type: Types.UPDATE_BOOKING_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.UPDATE_BOOKING_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* GetBooking(action) {
  yield put({type: Types.GET_BOOKING_REQUEST});
  try {
    const res = yield call(getBooking, action.payload);
    if (res.booking) {
      yield put({type: Types.GET_BOOKING_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_BOOKING_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.GET_BOOKING_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* GetBookings(action) {
  yield put({type: Types.GET_BOOKINGS_REQUEST});
  try {
    const res = yield call(getBookings, action.payload);
    if (res.bookings) {
      yield put({type: Types.GET_BOOKINGS_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_BOOKINGS_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.GET_BOOKINGS_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

export default [
  takeLatest(Types.CREATE_BOOKING, CreateBooking),
  takeLatest(Types.UPDATE_BOOKING, UpdateBooking),
  takeLatest(Types.GET_BOOKING, GetBooking),
  takeLatest(Types.GET_BOOKINGS, GetBookings),
];
