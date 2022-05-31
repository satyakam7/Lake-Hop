import {all} from 'redux-saga/effects';
import userSaga from './user';
import globalSaga from './global';
import boatSaga from './boat';
import lakeSaga from './lake';
import bookingSaga from './booking';
import marinaSaga from './marina';

export default function* sagas() {
  yield all([
    ...userSaga,
    ...globalSaga,
    ...boatSaga,
    ...lakeSaga,
    ...bookingSaga,
    ...marinaSaga,
  ]);
}
