import {put, call, takeLatest} from 'redux-saga/effects';

import Types from '../actions/actionTypes';
import Messages from '../theme/Messages';
import api from '../api';
const {
  getBoats,
  getMyBoats,
  getBoat,
  getBoatTimes,
  getBookmarks,
  createBookmark,
  destroyBookmark,
  createBoat,
  updateBoat,
  updateBoatImage,
  updateBoatLocations,
} = api;

function* GetBoat(action) {
  yield put({type: Types.GET_BOAT_REQUEST});
  try {
    const res = yield call(getBoat, action.payload);
    if (res.boat) {
      yield put({type: Types.GET_BOAT_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_BOAT_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.GET_BOAT_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* GetBoatTimes(action) {
  yield put({type: Types.GET_BOAT_TIMES_REQUEST});
  try {
    const res = yield call(getBoatTimes, action.payload);
    if (res.times) {
      yield put({type: Types.GET_BOAT_TIMES_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_BOAT_TIMES_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.GET_BOAT_TIMES_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* GetBoats(action) {
  yield put({type: Types.GET_BOATS_REQUEST});
  try {
    const res = yield call(getBoats, action.payload);
    if (res.boats) {
      yield put({type: Types.GET_BOATS_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_BOATS_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.GET_BOATS_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* GetMyBoats(action) {
  yield put({type: Types.GET_MY_BOATS_REQUEST});
  try {
    const res = yield call(getMyBoats, action.payload);
    if (res.boats) {
      yield put({type: Types.GET_MY_BOATS_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_MY_BOATS_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.GET_MY_BOATS_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* CreateBoat(action) {
  yield put({type: Types.CREATE_BOAT_REQUEST});
  try {
    const res = yield call(createBoat, action.payload);
    if (res.boat) {
      yield put({type: Types.CREATE_BOAT_SUCCESS, payload: res});
    } else {
      yield put({type: Types.CREATE_BOAT_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.CREATE_BOAT_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* UpdateBoat(action) {
  yield put({type: Types.UPDATE_BOAT_REQUEST});
  try {
    const res = yield call(updateBoat, action.payload);
    if (res.boat) {
      yield put({type: Types.UPDATE_BOAT_SUCCESS, payload: res});
    } else {
      yield put({type: Types.UPDATE_BOAT_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.UPDATE_BOAT_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* UpdateBoatImage(action) {
  yield put({type: Types.UPDATE_BOAT_IMAGE_REQUEST});
  try {
    const res = yield call(updateBoatImage, action.payload);
    if (res.boat) {
      yield put({type: Types.UPDATE_BOAT_IMAGE_SUCCESS, payload: res});
    } else {
      yield put({type: Types.UPDATE_BOAT_IMAGE_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.UPDATE_BOAT_IMAGE_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* UpdateBoatLocations(action) {
  yield put({type: Types.UPDATE_BOAT_LOCATIONS_REQUEST});
  try {
    const res = yield call(updateBoatLocations, action.payload);
    if (res.boat) {
      yield put({type: Types.UPDATE_BOAT_LOCATIONS_SUCCESS, payload: res});
    } else {
      yield put({type: Types.UPDATE_BOAT_LOCATIONS_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.UPDATE_BOAT_LOCATIONS_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* GetBookmarks(action) {
  yield put({type: Types.GET_BOOKMARKS_REQUEST});
  try {
    const res = yield call(getBookmarks);
    if (res.boats) {
      yield put({type: Types.GET_BOOKMARKS_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_BOOKMARKS_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.GET_BOOKMARKS_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* CreateBookmark(action) {
  yield put({type: Types.CREATE_BOOKMARK_REQUEST});
  try {
    const res = yield call(createBookmark, action.payload);
    if (res.bookmarked) {
      yield put({type: Types.CREATE_BOOKMARK_SUCCESS});
    } else {
      yield put({type: Types.CREATE_BOOKMARK_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.CREATE_BOOKMARK_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

function* DestroyBookmark(action) {
  yield put({type: Types.DESTROY_BOOKMARK_REQUEST});
  try {
    const res = yield call(destroyBookmark, action.payload);
    if (!res.bookmarked) {
      yield put({type: Types.DESTROY_BOOKMARK_SUCCESS});
    } else {
      yield put({type: Types.DESTROY_BOOKMARK_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({
      type: Types.DESTROY_BOOKMARK_FAILURE,
      error: Messages.NetWorkError,
    });
    console.log(error);
  }
}

export default [
  takeLatest(Types.GET_BOATS, GetBoats),
  takeLatest(Types.GET_MY_BOATS, GetMyBoats),
  takeLatest(Types.GET_BOAT, GetBoat),
  takeLatest(Types.GET_BOAT_TIMES, GetBoatTimes),
  takeLatest(Types.CREATE_BOAT, CreateBoat),
  takeLatest(Types.UPDATE_BOAT, UpdateBoat),
  takeLatest(Types.UPDATE_BOAT_IMAGE, UpdateBoatImage),
  takeLatest(Types.UPDATE_BOAT_LOCATIONS, UpdateBoatLocations),
  takeLatest(Types.GET_BOOKMARKS, GetBookmarks),
  takeLatest(Types.CREATE_BOOKMARK, CreateBookmark),
  takeLatest(Types.DESTROY_BOOKMARK, DestroyBookmark),
];
