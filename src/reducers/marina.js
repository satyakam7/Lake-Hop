import {createReducer} from 'reduxsauce';
import Types from '../actions/actionTypes';
import {Status} from '../constants';

export const initialState = {
  getMarinaStatus: Status.NONE,
  getMarinasStatus: Status.NONE,

  marinas: [],
  lakes: [],

  errorMessage: null,
};

///////////////////// Get Marina /////////////////////
const getMarinaRequest = state => ({
  ...state,
  getMarinaStatus: Status.REQUEST,
});

const getMarinaSuccess = (state, action) => ({
  ...state,
  getMarinaStatus: Status.SUCCESS,
});

const getMarinaFailure = (state, action) => ({
  ...state,
  getMarinaStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Get Marinas /////////////////////
const getMarinasRequest = state => ({
  ...state,
  getMarinasStatus: Status.REQUEST,
});

const getMarinasSuccess = (state, action) => ({
  ...state,
  getMarinasStatus: Status.SUCCESS,
  marinas: action.payload.marinas,
  lakes: action.payload.lakes,
});

const getMarinasFailure = (state, action) => ({
  ...state,
  getMarinasStatus: Status.FAILURE,
  errorMessage: action.error,
});

const actionHandlers = {
  [Types.GET_MARINA_REQUEST]: getMarinaRequest,
  [Types.GET_MARINA_SUCCESS]: getMarinaSuccess,
  [Types.GET_MARINA_FAILURE]: getMarinaFailure,

  [Types.GET_MARINAS_REQUEST]: getMarinasRequest,
  [Types.GET_MARINAS_SUCCESS]: getMarinasSuccess,
  [Types.GET_MARINAS_FAILURE]: getMarinasFailure,
};

export default createReducer(initialState, actionHandlers);
