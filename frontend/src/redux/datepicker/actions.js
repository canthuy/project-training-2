import {GET_DATE_RANGE} from './actionTypes';

const getDate = (payload) => {
  return {
    type: GET_DATE_RANGE,
    payload,
  };
};
export { getDate };
