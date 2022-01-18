import { combineReducers } from 'redux';
import reducer from './doughnut/reducer';
import rankingReducer from './ranking/reducer';
import heatChartReducer from './heatmap/reducer';
import dateReducer from './datepicker/reducer';
import lineChartReducer from './lineChart/reducer';

const rootReducer = combineReducers({
  device: reducer,
  ranking: rankingReducer,
  heatChart: heatChartReducer,
  datepicker: dateReducer,
  lineChart: lineChartReducer,
});

export default rootReducer;
