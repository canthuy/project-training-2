import axios from 'axios';

const getDeviceData = (startDate, endDate, device_types) => {
  return axios.get('http://localhost:3002/device_summary', {
    params: {
      startDate,
      endDate,
      device_types,
    },
  });
};

export { getDeviceData };
