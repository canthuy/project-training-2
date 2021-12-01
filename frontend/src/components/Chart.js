import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getData } from '../redux/actions';
import styled from 'styled-components';
Chart.register(ArcElement, Tooltip, Legend, Title);

const ChartSC = styled.div`
  width: 30%;
  margin: 10px auto;
`;

const ErrorSC = styled.h2`
  text-align: center;
  color: #be0f0f;
  margin: 20px;
`;

const ChartDoughnut = () => {
  const deviceData = useSelector((state) => state.deviceData);
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.loading);
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
            size: 16
          }
        }
      },
      title: {
        display: true,
        text: 'Decive Type',
        align: 'start',
        font: {
          size: 18,
          weight: 0
        },
        padding: {
          top: 50
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    cutout: '75%'
  };
  const data = {
    labels: ['Android', 'iOS'],
    datasets: [
      {
        data: [deviceData.android, deviceData.iOS],
        backgroundColor: ['#48c0b0', '#925de2'],
        hoverBackgroundColor: ['#48c0b0', '#925de2']
      }
    ]
  };
  const displayChart = (
    <ChartSC>
      <Doughnut data={data} options={options} />
    </ChartSC>
  );
  return (
    <Fragment>
      {isError && <ErrorSC>Error: Network Error</ErrorSC>}
      {!isError && !isLoading && displayChart}
    </Fragment>
  );
};
export default ChartDoughnut;
