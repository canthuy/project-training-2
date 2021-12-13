import {
  GET_RANKING_DATA,
  GET_RANKING_SUCCESS,
  GET_RANKING_ERROR,
} from '../../constants/ActionType';

const initState = {
  rankingData: [],
  loading: false,
  isError: false,
};
const rankingReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_RANKING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_RANKING_SUCCESS:
      const { data} = action.payload;
      console.log(data);
      return {
        ...state,
        rankingData: [...data],
        loading: false,
        isError: false,
      };
    case GET_RANKING_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return {
        ...state,
      };
  }
};
export default rankingReducer;
