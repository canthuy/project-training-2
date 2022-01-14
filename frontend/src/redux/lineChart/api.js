import axios from 'axios';

const getLineChartData = (startDate, endDate) => {
  return axios.get('http://localhost:3002/device_by_day', {
    params: { startDate, endDate },
  });
};

export { getLineChartData };
