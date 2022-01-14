import {
  GET_LINECHART_DATA,
  GET_LINECHART_SUCCESS,
  GET_LINECHART_ERROR,
} from './ActionType';

const getData = (payload) => {
  return {
    type: GET_LINECHART_DATA,
    payload,
  };
};
const getDataSuccess = (payload) => {
  return {
    type: GET_LINECHART_SUCCESS,
    payload,
  };
};
const getDataError = (payload) => {
  return {
    type: GET_LINECHART_ERROR,
    payload,
  };
};

export { getData, getDataSuccess, getDataError };
