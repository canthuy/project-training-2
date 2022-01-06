import axios from 'axios';

const getRankingData = (startDate, endDate) => {
  return axios.get('http://localhost:3002/ranking', {
    params: {
      startDate, endDate
    }
  });
};

export { getRankingData };
