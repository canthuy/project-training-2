import axios from 'axios';

const getDeviceData = (startDate, endDate) => {
  return axios.get('http://localhost:3002/device_summary', {
    params: {
      startDate,
      endDate,
    },
  });
};

export { getDeviceData };
