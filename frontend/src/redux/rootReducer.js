import reducer from './doughnut/reducer';
import rankingReducer from './ranking/reducer';
import heatChartReducer from './heatmap/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  device: reducer,
  ranking: rankingReducer,
  heatChart: heatChartReducer,
});

export default rootReducer;
