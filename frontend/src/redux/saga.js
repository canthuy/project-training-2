import { call, put, takeLatest } from "redux-saga/effects";

import { getDataSuccess } from "./actions";
import { getDeviceData } from "./api";

function* getDeviceType() {
  try {
    const data = yield call(getDeviceData);
    yield put(getDataSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* deviceSaga() {
  yield takeLatest("GET_DEVICE_DATA", getDeviceType);
}
export default deviceSaga;
