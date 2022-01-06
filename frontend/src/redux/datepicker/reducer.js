import { GET_DATE_RANGE } from './actionTypes';

const initState = {
  startDate: null,
  endDate: null,
};

const dateReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DATE_RANGE:
      return {
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    default:
      return {
        ...state,
      };
  }
};

export default dateReducer;
