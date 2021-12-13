import { all, fork } from 'redux-saga/effects';
import deviceSaga from './doughnut/saga';
import rankingSaga from './ranking/saga';

function* rootSaga() {
  yield all([fork(deviceSaga), fork(rankingSaga)]);
}
export default rootSaga;
