import {put, call, takeLatest} from 'redux-saga/effects';

import Types from '../actions/actionTypes';
import Messages from '../theme/Messages';
import api from '../api';
const {
  loginUser,
  signUpUser,
  resetPassword,
  updateProfilePicture,
  updateBoatDates,
} = api;

function* LoginUser(action) {
  yield put({type: Types.LOGIN_REQUEST});
  try {
    const res = yield call(loginUser, action.payload);
    if (res.user) {
      yield put({type: Types.LOGIN_SUCCESS, payload: res});
    } else {
      yield put({type: Types.LOGIN_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.LOGIN_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* SignUpUser(action) {
  yield put({type: Types.SIGNUP_REQUEST});
  try {
    const res = yield call(signUpUser, action.payload);
    if (res.user) {
      yield put({type: Types.SIGNUP_SUCCESS, payload: res});
    } else {
      yield put({type: Types.SIGNUP_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.SIGNUP_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* ResetPassword(action) {
  yield put({type: Types.RESET_PASSWORD_REQUEST});
  try {
    const res = yield call(resetPassword, action.payload);
    if (res.success) {
      yield put({type: Types.RESET_PASSWORD_SUCCESS, payload: res});
    } else {
      yield put({
        type: Types.RESET_PASSWORD_FAILURE,
        error: res.error,
      });
    }
  } catch (error) {
    yield put({
      type: Types.RESET_PASSWORD_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* UpdateProfilePicture(action) {
  yield put({type: Types.UPDATE_PROFILE_PICTURE_REQUEST});
  try {
    const res = yield call(updateProfilePicture, action.payload);
    if (res.user) {
      yield put({type: Types.UPDATE_PROFILE_PICTURE_SUCCESS, payload: res});
    } else {
      yield put({
        type: Types.UPDATE_PROFILE_PICTURE_FAILURE,
        error: res.error,
      });
    }
  } catch (error) {
    yield put({
      type: Types.UPDATE_PROFILE_PICTURE_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* UpdateBoatDates(action) {
  yield put({type: Types.UPDATE_BOAT_DATES_REQUEST});
  try {
    const res = yield call(updateBoatDates, action.payload);
    if (res.user) {
      yield put({type: Types.UPDATE_BOAT_DATES_SUCCESS, payload: res});
    } else {
      yield put({
        type: Types.UPDATE_BOAT_DATES_FAILURE,
        error: res.error,
      });
    }
  } catch (error) {
    yield put({
      type: Types.UPDATE_BOAT_DATES_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

export default [
  takeLatest(Types.LOGIN_USER, LoginUser),
  takeLatest(Types.SIGNUP_USER, SignUpUser),
  takeLatest(Types.RESET_PASSWORD, ResetPassword),
  takeLatest(Types.UPDATE_PROFILE_PICTURE, UpdateProfilePicture),
  takeLatest(Types.UPDATE_BOAT_DATES, UpdateBoatDates),
];
