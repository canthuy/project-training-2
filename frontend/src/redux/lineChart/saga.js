import { put, call, takeLatest } from 'redux-saga/effects';
import { getLineChartData } from './api';
import { getDataSuccess, getDataError } from './actions';

function* getLineChart(action) {
  try {
    const data = yield call(getLineChartData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch {
    yield put(getDataError());
  }
}
function* lineChartSaga() {
  yield takeLatest('GET_LINE_CHART_DATA', getLineChart);
}

export default lineChartSaga;
