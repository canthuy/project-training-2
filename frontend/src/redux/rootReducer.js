import { combineReducers } from 'redux';
import reducer from './doughnut/reducer';
import rankingReducer from './ranking/reducer';
import heatChartReducer from './heatmap/reducer';
import dateReducer from './datepicker/reducer';

const rootReducer = combineReducers({
  device: reducer,
  ranking: rankingReducer,
  heatChart: heatChartReducer,
  datepicker: dateReducer,
});

export default rootReducer;
