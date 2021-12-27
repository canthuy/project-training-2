import axios from 'axios';

const getHeatChartData = () => {
  return axios.get('http://localhost:3002/heat_chart');
};
export { getHeatChartData };
