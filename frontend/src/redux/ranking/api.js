import axios from 'axios';

const getRankingData = () => {
  return axios.get('http://localhost:3002/ranking');
};

export { getRankingData };
