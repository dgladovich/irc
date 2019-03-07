import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_CONFIG } from './constants';
import { configLoaded, configLoadingError } from './actions';

export function* getConfig() {
  const requestURL = `http://localhost:3000/config`;

  try {
    const config = yield call(request, requestURL);
    yield put(configLoaded(config));
  } catch (err) {
    yield put(configLoadingError(err));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOAD_CONFIG, getConfig);
}
