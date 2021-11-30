import { GET_DEVICE_DATA, GET_DATA_SUCCESS } from "../constants/ActionType";

const initState = {
  deviceData: {},
  loading: false,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DEVICE_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        deviceData: { ...state.deviceData, ...data },
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
