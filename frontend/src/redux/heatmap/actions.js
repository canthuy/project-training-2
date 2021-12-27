import {
  GET_HEATCHART_DATA,
  GET_HEATCHART_SUCCESS,
  GET_HEATCHART_ERROR,
} from './ActionType';

const getData = (payload) => {
  return {
    type: GET_HEATCHART_DATA,
    payload,
  };
};

const getDataSuccess = (payload) => {
  return {
    type: GET_HEATCHART_SUCCESS,
    payload,
  };
};

const getDataError = (payload) => {
  return {
    type: GET_HEATCHART_ERROR,
    payload,
  };
};

export { getData, getDataSuccess, getDataError };
