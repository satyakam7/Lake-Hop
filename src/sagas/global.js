import {put, call, takeLatest} from 'redux-saga/effects';
import Types from '../actions/actionTypes';
import Messages from '../theme/Messages';

function* SwitchClientGuest(action) {
  yield put({type: Types.SWITCH_CLIENT_GUEST_SUCCESS, payload: action.payload});
}
export default [takeLatest(Types.SWITCH_CLIENT_GUEST, SwitchClientGuest)];
