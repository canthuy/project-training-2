import reducer from './doughnut/reducer';
import rankingReducer from './ranking/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  device: reducer,
  ranking: rankingReducer,
});

export default rootReducer;
