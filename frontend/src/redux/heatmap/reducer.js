import {
  GET_HEAT_CHART_DATA,
  GET_HEAT_CHART_SUCCESS,
  GET_HEAT_CHART_ERROR,
} from './types';

const initState = {
  heatmapData: [],
  loading: false,
  isError: false,
};
const heatChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_HEAT_CHART_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_HEAT_CHART_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        heatmapData: [...data],
        loading: false,
        isError: false,
      };
    case GET_HEAT_CHART_ERROR:
      return {
        ...state,
        loading: false,
        isError: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default heatChartReducer;
