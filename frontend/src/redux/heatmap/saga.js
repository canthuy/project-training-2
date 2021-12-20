import { call, put, takeLatest } from 'redux-saga/effects';
import { getHeatChartData } from './api';
import { getDataSuccess, getDataError } from './actions';

function* getHeatmap() {
  try {
    const data = yield call(getHeatChartData);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

function* heatChartSaga() {
  yield takeLatest('GET_HEATCHART_DATA', getHeatmap);
}

export default heatChartSaga;
