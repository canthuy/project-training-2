import { GET_DATE_RANGE } from './types';

const getDate = (payload) => {
  return {
    type: GET_DATE_RANGE,
    payload,
  };
};
export { getDate };
