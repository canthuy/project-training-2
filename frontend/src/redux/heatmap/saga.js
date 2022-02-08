import { call, put, takeLatest } from 'redux-saga/effects';
import { getHeatChartData } from './api';
import { getDataSuccess, getDataError } from './actions';

function* getHeatmap(action) {
  try {
    const data = yield call(getHeatChartData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

function* heatChartSaga() {
  yield takeLatest('GET_HEAT_CHART_DATA', getHeatmap);
}

export default heatChartSaga;
