import {
  GET_DEVICE_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR
} from '../../constants/ActionType';

const getData = (payload) => {
  return {
    type: GET_DEVICE_DATA,
    payload
  };
};

const getDataSuccess = (payload) => {
  return {
    type: GET_DATA_SUCCESS,
    payload
  };
};

const getDataError = (payload) => {
  return {
    type: GET_DATA_ERROR,
    payload
  };
};
export { getData, getDataSuccess, getDataError };
