import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getData } from '../../redux/heatmap/actions';
import Chart from 'react-apexcharts';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { ChartHeatmapSC } from './ChartHeatmap.styles';

const ChartHeatmap = () => {
  const { heatmapData, loading, isError } = useSelector(
    (state) => state.heatChart
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    
    colors: ['#8f6cc8'],
    title: {
      text: 'Device By Hour',
      margin: 0,
      style: {
        fontSize: '18px',
        fontWeight: 500,
      },
    },
    xaxis: {
      labels: {
        formatter: (value) => {
          return parseInt(value);
        },
        style: {
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        align: 'left',
        formatter: (value) => {
          return value;
        },
        style: {
          fontSize: '14px',
        },
      },
    },
  };

  return (
    <Fragment>
      {loading && (
        <ChartHeatmapSC>
          <Loading />
        </ChartHeatmapSC>
      )}
      {isError && (
        <ChartHeatmapSC>
          <Error message="Error: Network Error" />
        </ChartHeatmapSC>
      )}
      {!isError && !loading && (
        <ChartHeatmapSC>
          <Chart
            options={options}
            series={heatmapData}
            type="heatmap"
            height={350}
          />
        </ChartHeatmapSC>
      )}
    </Fragment>
  );
};

export default ChartHeatmap;
