import {combineReducers} from 'redux';
import global from './global';
import user from './user';
import boat from './boat';
import lake from './lake';
import booking from './booking';
import marina from './marina';

const applicationReducers = {global, user, boat, lake, booking, marina};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
