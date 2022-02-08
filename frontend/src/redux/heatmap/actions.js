import {
  GET_HEAT_CHART_DATA,
  GET_HEAT_CHART_SUCCESS,
  GET_HEAT_CHART_ERROR,
} from './types';

const getData = (payload) => {
  return {
    type: GET_HEAT_CHART_DATA,
    payload,
  };
};

const getDataSuccess = (payload) => {
  return {
    type: GET_HEAT_CHART_SUCCESS,
    payload,
  };
};

const getDataError = (payload) => {
  return {
    type: GET_HEAT_CHART_ERROR,
    payload,
  };
};

export { getData, getDataSuccess, getDataError };
