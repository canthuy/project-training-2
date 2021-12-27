import {
  GET_HEATCHART_DATA,
  GET_HEATCHART_SUCCESS,
  GET_HEATCHART_ERROR,
} from './ActionType';

const initState = {
  heatmapData: [],
  loading: false,
  isError: false,
};
const heatChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_HEATCHART_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_HEATCHART_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        heatmapData: [...data],
        loading: false,
        isError: false,
      };
    case GET_HEATCHART_ERROR:
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
