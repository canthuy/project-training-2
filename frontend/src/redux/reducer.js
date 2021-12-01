import {
  GET_DEVICE_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR
} from '../constants/ActionType';

const initState = {
  deviceData: {},
  loading: false,
  isError: false
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DEVICE_DATA:
      return {
        ...state,
        loading: true
      };
    case GET_DATA_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        deviceData: { ...state.deviceData, ...data },
        loading: false,
        isError: false
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        isError: true,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};
export default reducer;
