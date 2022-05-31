import {createReducer} from 'reduxsauce';
import Types from '../actions/actionTypes';
import {Status} from '../constants';

export const initialState = {
  switchClientGuest: null,
};

const switchClientGuest = (state, action) => {
  return {
    ...state,
    switchClientGuest: action.payload.switch,
  };
};

const actionHandlers = {
  [Types.SWITCH_CLIENT_GUEST_SUCCESS]: switchClientGuest,
};

export default createReducer(initialState, actionHandlers);
