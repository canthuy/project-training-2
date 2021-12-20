import { all, fork } from 'redux-saga/effects';
import deviceSaga from './doughnut/saga';
import rankingSaga from './ranking/saga';
import heatChartSaga from './heatmap/saga';

function* rootSaga() {
  yield all([fork(deviceSaga), fork(rankingSaga), fork(heatChartSaga)]);
}
export default rootSaga;
