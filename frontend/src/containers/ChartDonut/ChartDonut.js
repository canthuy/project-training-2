import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getData } from '../../redux/doughnut/actions';
import { ChartSC } from './ChartDonut.styles';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import ModalLabel from './ModalLabel';
Chart.register(ArcElement, Tooltip, Legend, Title);

const ChartDoughnut = () => {
  const { deviceData, loading, isError } = useSelector((state) => state.device);
  const { startDate, endDate } = useSelector((state) => state.datepicker);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData([startDate, endDate, deviceData.map((val) => val.x)]));
  }, [startDate, endDate]);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 15,
          boxHeight: 10,
          padding: 20,
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: 'Device Type',
        align: 'start',
        font: {
          size: 18,
          weight: 0,
        },
        padding: {
          top: 20,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutout: '75%',
  };

  const data = {
    labels: deviceData.map((val) => val.x),
    datasets: [
      {
        data: deviceData.map((val) => val.y),
        backgroundColor: [
          '#48c0b0',
          '#925de2',
          '#36a2eb',
          '#c9cbcf',
          '#ffcd56',
          '#f77b00',
        ],
        hoverBackgroundColor: [
          '#48c0b0',
          '#925de2',
          '#36a2eb',
          '#c9cbcf',
          '#ffcd56',
          '#f77b00',
        ],
      },
    ],
  };

  const displayChart = (
    <Fragment>
      <ModalLabel />
      <Doughnut data={data} options={options} />
    </Fragment>
  );
  
  return (
    <ChartSC>
      {loading && <Loading />}
      {isError && <Error message="Error: Network Error" />}
      {!isError && !loading && displayChart}
    </ChartSC>
  );
};
export default ChartDoughnut;
