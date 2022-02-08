import {
  GET_LINE_CHART_DATA,
  GET_LINE_CHART_SUCCESS,
  GET_LINE_CHART_ERROR,
} from './types';

const initState = {
  deviceData: [],
  loading: false,
  isError: false,
};

const lineChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LINE_CHART_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_LINE_CHART_SUCCESS:
      const { data } = action.payload;
      return {
        deviceData: [...data],
        loading: false,
        isError: false,
      };
    case GET_LINE_CHART_ERROR:
      return {
        ...state,
        loading: false,
        isError: true,
      };
    default:
      return { ...state };
  }
};
export default lineChartReducer;
