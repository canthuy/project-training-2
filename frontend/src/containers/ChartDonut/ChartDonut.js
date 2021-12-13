import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getData } from '../../redux/doughnut/actions';
import { ChartSC } from './ChartDonut.styles';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
Chart.register(ArcElement, Tooltip, Legend, Title);

const ChartDoughnut = () => {
  const deviceData = useSelector((state) => state.device.deviceData);
  const isError = useSelector((state) => state.device.isError);
  const isLoading = useSelector((state) => state.device.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 15,
          boxHeight: 10,
          padding: 40,
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: 'Decive Type',
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
    labels: ['Android', 'iOS'],
    datasets: [
      {
        data: [deviceData.android, deviceData.iOS],
        backgroundColor: ['#48c0b0', '#925de2'],
        hoverBackgroundColor: ['#48c0b0', '#925de2'],
      },
    ],
  };
  const displayChart = (
    <ChartSC>
      <Doughnut data={data} options={options} />
    </ChartSC>
  );
  return (
    <Fragment>
      {isLoading && (
        <ChartSC>
          <Loading />
        </ChartSC>
      )}
      {isError && <Error message="Error: Network Error" />}
      {!isError && !isLoading && displayChart}
    </Fragment>
  );
};
export default ChartDoughnut;
