import {createReducer} from 'reduxsauce';
import Types from '../actions/actionTypes';
import {Status} from '../constants';
import {ConstantStore} from '../functions';

export const initialState = {
  getBoatsStatus: Status.NONE,
  getMyBoatsStatus: Status.NONE,
  getBoatStatus: Status.NONE,
  getBoatTimesStatus: Status.NONE,
  createBoatStatus: Status.NONE,
  updateBoatStatus: Status.NONE,
  updateBoatImageStatus: Status.NONE,
  updateBoatLocationsStatus: Status.NONE,
  getBookmarksStatus: Status.NONE,
  createBookmarkStatus: Status.NONE,
  destroyBookmarkStatus: Status.NONE,

  boats: [],
  myboats: [],
  boat_times: null,
  lake_id: null,
  bookmarks: [],
  boat: null,
  errorMessage: null,
};
///////////////////// Boat Search /////////////////////
const getBoatsRequest = state => ({
  ...state,
  getBoatsStatus: Status.REQUEST,
});

const getBoatsSuccess = (state, action) => ({
  ...state,
  boats: action.payload.boats,
  lake_id: action.payload.lake.id,
  getBoatsStatus: Status.SUCCESS,
});

const getBoatsFailure = (state, action) => ({
  ...state,
  getBoatsStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Get My Boats /////////////////////
const getMyBoatsRequest = state => ({
  ...state,
  getMyBoatsStatus: Status.REQUEST,
});

const getMyBoatsSuccess = (state, action) => ({
  ...state,
  myboats: action.payload.boats,
  getMyBoatsStatus: Status.SUCCESS,
});

const getMyBoatsFailure = (state, action) => ({
  ...state,
  getMyBoatsStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Get Boat /////////////////////
const getBoatRequest = state => ({
  ...state,
  getBoatStatus: Status.REQUEST,
});

const getBoatSuccess = (state, action) => ({
  ...state,
  boat: action.payload.boat,
  getBoatStatus: Status.SUCCESS,
});

const getBoatFailure = (state, action) => ({
  ...state,
  getBoatStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Get Boat Times /////////////////////
const getBoatTimesRequest = state => ({
  ...state,
  getBoatTimesStatus: Status.REQUEST,
});

const getBoatTimesSuccess = (state, action) => ({
  ...state,
  boat_times: action.payload.times,
  getBoatTimesStatus: Status.SUCCESS,
});

const getBoatTimesFailure = (state, action) => ({
  ...state,
  getBoatTimesStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Create Boat /////////////////////
const createBoatRequest = state => ({
  ...state,
  createBoatStatus: Status.REQUEST,
});

const createBoatSuccess = (state, action) => {
  ConstantStore.setItem('new_boat_id', action.payload.boat.id);
  return {
    ...state,
    createBoatStatus: Status.SUCCESS,
  };
};

const createBoatFailure = (state, action) => ({
  ...state,
  createBoatStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Update Boat /////////////////////
const updateBoatRequest = state => ({
  ...state,
  updateBoatStatus: Status.REQUEST,
});

const updateBoatSuccess = (state, action) => ({
  ...state,
  updateBoatStatus: Status.SUCCESS,
});

const updateBoatFailure = (state, action) => ({
  ...state,
  updateBoatStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Update Boat Image /////////////////////
const updateBoatImageRequest = state => ({
  ...state,
  updateBoatImageStatus: Status.REQUEST,
});

const updateBoatImageSuccess = (state, action) => ({
  ...state,
  updateBoatImageStatus: Status.SUCCESS,
});

const updateBoatImageFailure = (state, action) => ({
  ...state,
  updateBoatStatus: Status.FAILURE,
  updateBoatImageStatus: action.error,
});

///////////////////// Update Boat Locations /////////////////////
const updateBoatLocationsRequest = state => ({
  ...state,
  updateBoatLocationsStatus: Status.REQUEST,
});

const updateBoatLocationsSuccess = (state, action) => ({
  ...state,
  updateBoatLocationsStatus: Status.SUCCESS,
});

const updateBoatLocationsFailure = (state, action) => ({
  ...state,
  updateBoatLocationsStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Get Bookmarks /////////////////////
const getBookmarksRequest = state => ({
  ...state,
  getBookmarksStatus: Status.REQUEST,
});

const getBookmarksSuccess = (state, action) => ({
  ...state,
  bookmarks: action.payload.boats,
  getBookmarksStatus: Status.SUCCESS,
});

const getBookmarksFailure = (state, action) => ({
  ...state,
  getBookmarksStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Create Bookmark /////////////////////
const createBookmarkRequest = state => ({
  ...state,
  createBookmarkStatus: Status.REQUEST,
});

const createBookmarkSuccess = (state, action) => ({
  ...state,
  createBookmarkStatus: Status.SUCCESS,
});

const createBookmarkFailure = (state, action) => ({
  ...state,
  createBookmarkStatus: Status.FAILURE,
  errorMessage: action.error,
});

///////////////////// Destroy Bookmark /////////////////////
const destroyBookmarkRequest = state => ({
  ...state,
  destroyBookmarkStatus: Status.REQUEST,
});

const destroyBookmarkSuccess = (state, action) => ({
  ...state,
  destroyBookmarkStatus: Status.SUCCESS,
});

const destroyBookmarkFailure = (state, action) => ({
  ...state,
  destroyBookmarkStatus: Status.FAILURE,
  errorMessage: action.error,
});

const actionHandlers = {
  [Types.GET_BOAT_REQUEST]: getBoatRequest,
  [Types.GET_BOAT_SUCCESS]: getBoatSuccess,
  [Types.GET_BOAT_FAILURE]: getBoatFailure,

  [Types.GET_BOAT_TIMES_REQUEST]: getBoatTimesRequest,
  [Types.GET_BOAT_TIMES_SUCCESS]: getBoatTimesSuccess,
  [Types.GET_BOAT_TIMES_FAILURE]: getBoatTimesFailure,

  [Types.GET_BOATS_REQUEST]: getBoatsRequest,
  [Types.GET_BOATS_SUCCESS]: getBoatsSuccess,
  [Types.GET_BOATS_FAILURE]: getBoatsFailure,

  [Types.GET_MY_BOATS_REQUEST]: getMyBoatsRequest,
  [Types.GET_MY_BOATS_SUCCESS]: getMyBoatsSuccess,
  [Types.GET_MY_BOATS_FAILURE]: getMyBoatsFailure,

  [Types.CREATE_BOAT_REQUEST]: createBoatRequest,
  [Types.CREATE_BOAT_SUCCESS]: createBoatSuccess,
  [Types.CREATE_BOAT_FAILURE]: createBoatFailure,

  [Types.UPDATE_BOAT_REQUEST]: updateBoatRequest,
  [Types.UPDATE_BOAT_SUCCESS]: updateBoatSuccess,
  [Types.UPDATE_BOAT_FAILURE]: updateBoatFailure,

  [Types.UPDATE_BOAT_IMAGE_REQUEST]: updateBoatImageRequest,
  [Types.UPDATE_BOAT_IMAGE_SUCCESS]: updateBoatImageSuccess,
  [Types.UPDATE_BOAT_IMAGE_FAILURE]: updateBoatImageFailure,

  [Types.UPDATE_BOAT_LOCATIONS_REQUEST]: updateBoatLocationsRequest,
  [Types.UPDATE_BOAT_LOCATIONS_SUCCESS]: updateBoatLocationsSuccess,
  [Types.UPDATE_BOAT_LOCATIONS_FAILURE]: updateBoatLocationsFailure,

  [Types.GET_BOOKMARKS_REQUEST]: getBookmarksRequest,
  [Types.GET_BOOKMARKS_SUCCESS]: getBookmarksSuccess,
  [Types.GET_BOOKMARKS_FAILURE]: getBookmarksFailure,

  [Types.CREATE_BOOKMARK_REQUEST]: createBookmarkRequest,
  [Types.CREATE_BOOKMARK_SUCCESS]: createBookmarkSuccess,
  [Types.CREATE_BOOKMARK_FAILURE]: createBookmarkFailure,

  [Types.DESTROY_BOOKMARK_REQUEST]: destroyBookmarkRequest,
  [Types.DESTROY_BOOKMARK_SUCCESS]: destroyBookmarkSuccess,
  [Types.DESTROY_BOOKMARK_FAILURE]: destroyBookmarkFailure,
};

export default createReducer(initialState, actionHandlers);
