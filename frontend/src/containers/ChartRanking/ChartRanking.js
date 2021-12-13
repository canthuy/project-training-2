import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getData } from '../../redux/ranking/actions';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { RankingSC } from './ChartRanking.styles';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const ChartRanking = () => {
  const { rankingData, loading, isError } = useSelector(
    (state) => state.ranking
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);
  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          display: true,
          padding: 10,
          mirror: true,
          font: {
            size: 16,
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Ranking',
        align: 'start',
        font: {
          size: 18,
          weight: 0,
        },
        padding: {
          bottom: 20,
        },
      },
    },
  };
  const data = {
    labels: rankingData.map((val) => val.label),
    datasets: [
      {
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: rankingData.map((val) => val.value),
        backgroundColor: '#925de25c',
      },
    ],
  };
  return (
    <Fragment>
      {isError && <Error message="Error: Network Error" />}
      {loading && (
        <RankingSC>
          <Loading />
        </RankingSC>
      )}
      {!loading && !isError && (
        <RankingSC>
          <Bar data={data} options={options} />
        </RankingSC>
      )}
    </Fragment>
  );
};

export default ChartRanking;
