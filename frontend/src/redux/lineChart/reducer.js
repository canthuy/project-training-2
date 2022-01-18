import {
  GET_LINECHART_DATA,
  GET_LINECHART_SUCCESS,
  GET_LINECHART_ERROR,
} from './ActionType';

const initState = {
  deviceData: [],
  loading: false,
  isError: false,
};

const lineChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LINECHART_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_LINECHART_SUCCESS:
      const { data } = action.payload;
      return {
        deviceData: [...data],
        loading: false,
        isError: false,
      };
    case GET_LINECHART_ERROR:
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
