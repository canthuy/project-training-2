import { call, put, takeLatest } from 'redux-saga/effects';

import { getDataSuccess, getDataError } from './actions';
import { getDeviceData } from './api';

function* getDeviceType(action) {
  try {
    const data = yield call(getDeviceData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

function* deviceSaga() {
  yield takeLatest('GET_DEVICE_DATA', getDeviceType);
}
export default deviceSaga;
