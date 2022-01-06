import axios from 'axios';

const getHeatChartData = (startDate, endDate) => {
  return axios.get('http://localhost:3002/heat_chart', {
    params: { startDate, endDate },
  });
};
export { getHeatChartData };
