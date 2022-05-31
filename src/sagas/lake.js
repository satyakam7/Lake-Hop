import {put, call, takeLatest} from 'redux-saga/effects';

import Types from '../actions/actionTypes';
import Messages from '../theme/Messages';
import api from '../api';
const {searchLakes} = api;

function* SearchLakes(action) {
  yield put({type: Types.SEARCH_LAKES_REQUEST});
  try {
    const res = yield call(searchLakes, action.payload);
    if (res.lakes) {
      yield put({type: Types.SEARCH_LAKES_SUCCESS, payload: res});
    } else {
      yield put({type: Types.SEARCH_LAKES_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.SEARCH_LAKES_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

export default [takeLatest(Types.SEARCH_LAKES, SearchLakes)];
