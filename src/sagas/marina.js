import {put, call, takeLatest} from 'redux-saga/effects';

import Types from '../actions/actionTypes';
import Messages from '../theme/Messages';
import api from '../api';
const {getMarina, getMarinas} = api;

function* GetMarina(action) {
  yield put({type: Types.GET_MARINA_REQUEST});
  try {
    const res = yield call(getMarina, action.payload);
    if (res.marinas) {
      yield put({type: Types.GET_MARINA_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_MARINA_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.GET_MARINA_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

function* GetMarinas(action) {
  yield put({type: Types.GET_MARINAS_REQUEST});
  try {
    const res = yield call(getMarinas, action.payload);
    if (res.marinas && res.lakes) {
      yield put({type: Types.GET_MARINAS_SUCCESS, payload: res});
    } else {
      yield put({type: Types.GET_MARINAS_FAILURE, error: res.error});
    }
  } catch (error) {
    yield put({type: Types.GET_MARINAS_FAILURE, error: Messages.NetWorkError});
    console.log(error);
  }
}

export default [
  takeLatest(Types.GET_MARINA, GetMarina),
  takeLatest(Types.GET_MARINAS, GetMarinas),
];
