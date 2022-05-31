import {createReducer} from 'reduxsauce';
import Types from '../actions/actionTypes';
import {Status} from '../constants';

export const initialState = {
  searchLakesStatus: Status.NONE,

  lakes: [],
  errorMessage: null,
};

/////////////// SEARCH LAKES ///////////////
const searchLakesRequest = state => ({
  ...state,
  searchLakesStatus: Status.REQUEST,
});

const searchLakesSuccess = (state, action) => ({
  ...state,
  lakes: action.payload.lakes,
  searchLakesStatus: Status.SUCCESS,
});

const searchLakesFailure = (state, action) => ({
  ...state,
  searchLakesStatus: Status.FAILURE,
  errorMessage: action.error,
});

const actionHandlers = {
  [Types.SEARCH_LAKES_REQUEST]: searchLakesRequest,
  [Types.SEARCH_LAKES_SUCCESS]: searchLakesSuccess,
  [Types.SEARCH_LAKES_FAILURE]: searchLakesFailure,
};

export default createReducer(initialState, actionHandlers);
