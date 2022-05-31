import {createReducer} from 'reduxsauce';
import Types from '../actions/actionTypes';
import {Status} from '../constants';
import {ConstantStore, tenMinFromNow} from '../functions';

export const initialState = {
  loginUserStatus: Status.NONE,
  signUpUserStatus: Status.NONE,
  resetPasswordStatus: Status.NONE,
  updateProfilePictureStatus: Status.NONE,
  updateBoatDatesStatus: Status.NONE,

  currentUser: null,
  errorMessage: null,
};

/////////////// LOGIN USER ///////////////
const loginUserRequest = state => ({
  ...state,
  loginUserStatus: Status.REQUEST,
});

const loginUserSuccess = (state, action) => {
  ConstantStore.setItem('authToken', action.payload.auth_token);
  ConstantStore.setItem('tokenExpires', tenMinFromNow());
  return {
    ...state,
    currentUser: action.payload.user,
    loginUserStatus: Status.SUCCESS,
  };
};

const loginUserFailure = (state, action) => ({
  ...state,
  loginUserStatus: Status.FAILURE,
  errorMessage: action.error,
});

/////////////// SIGNUP USER ///////////////
const signUpUserRequest = state => ({
  ...state,
  signUpUserStatus: Status.REQUEST,
});

const signUpUserSuccess = (state, action) => ({
  ...state,
  authToken: action.payload.auth_token,
  currentUser: action.payload.user,
  signUpUserStatus: Status.SUCCESS,
});

const signUpUserFailure = (state, action) => ({
  ...state,
  signUpUserStatus: Status.FAILURE,
  errorMessage: action.error,
});

/////////////// RESET PASSWORD ///////////////
const resetPasswordRequest = state => ({
  ...state,
  resetPasswordStatus: Status.REQUEST,
});

const resetPasswordSuccess = (state, action) => ({
  ...state,
  resetPasswordStatus: Status.SUCCESS,
});

const resetPasswordFailure = (state, action) => ({
  ...state,
  resetPasswordStatus: Status.FAILURE,
  errorMessage: action.error,
});

/////////////// UPDATE PROFILE PICTURE ///////////////
const updateProfilePictureRequest = state => ({
  ...state,
  updateProfilePictureStatus: Status.REQUEST,
});

const updateProfilePictureSuccess = (state, action) => ({
  ...state,
  updateProfilePictureStatus: Status.SUCCESS,
  currentUser: action.payload.user,
});

const updateProfilePictureFailure = (state, action) => ({
  ...state,
  updateProfilePictureStatus: Status.FAILURE,
  errorMessage: action.error,
});

/////////////// UPDATE PROFILE PICTURE ///////////////
const updateBoatDatesRequest = state => ({
  ...state,
  updateBoatDatesStatus: Status.REQUEST,
});

const updateBoatDatesSuccess = (state, action) => ({
  ...state,
  updateBoatDatesStatus: Status.SUCCESS,
  currentUser: action.payload.user,
});

const updateBoatDatesFailure = (state, action) => ({
  ...state,
  updateBoatDatesStatus: Status.FAILURE,
  errorMessage: action.error,
});

const actionHandlers = {
  [Types.LOGIN_REQUEST]: loginUserRequest,
  [Types.LOGIN_SUCCESS]: loginUserSuccess,
  [Types.LOGIN_FAILURE]: loginUserFailure,

  [Types.SIGNUP_REQUEST]: signUpUserRequest,
  [Types.SIGNUP_SUCCESS]: signUpUserSuccess,
  [Types.SIGNUP_FAILURE]: signUpUserFailure,

  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,

  [Types.UPDATE_PROFILE_PICTURE_REQUEST]: updateProfilePictureRequest,
  [Types.UPDATE_PROFILE_PICTURE_SUCCESS]: updateProfilePictureSuccess,
  [Types.UPDATE_PROFILE_PICTURE_FAILURE]: updateProfilePictureFailure,

  [Types.UPDATE_BOAT_DATES_REQUEST]: updateBoatDatesRequest,
  [Types.UPDATE_BOAT_DATES_SUCCESS]: updateBoatDatesSuccess,
  [Types.UPDATE_BOAT_DATES_FAILURE]: updateBoatDatesFailure,
};

export default createReducer(initialState, actionHandlers);
