import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getData } from '../../redux/heatmap/actions';
import Chart from 'react-apexcharts';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import {
  ChartSC,
  Title,
  ChartHeatmapSC,
  BarChartSC,
  ColorGradient,
  NoteNumber,
} from './ChartHeatmap.styles';

const ChartHeatmap = () => {
  const { heatmapData, loading, isError } = useSelector(
    (state) => state.heatChart
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const dataBarChart = heatmapData.map((value) => {
    return value.data.reduce((sum, curentVal) => {
      return sum + curentVal.y;
    }, 0);
  });
  const maxValue = Math.max(...dataBarChart);
  const optionsBar = {
    chart: {
      offsetX: -30,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 7,
        barHeight: '95%',
      },
    },
    colors: '#35a596',
    dataLabels: {
      textAnchor: 'start',
      style: {
        fontWeight: 400,
        fontSize: '15px',
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      min: 0,
      max: maxValue,
      categories: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ].reverse(),
      labels: {
        show: true,
        hideOverlappingLabels: true,
        formatter: (value) => {
          if (value.toFixed(0) < maxValue) {
            return value > 0 ? '' : 0;
          } else {
            return value.toFixed(0);
          }
        },
        style: {
          fontSize: '14px',
        },
      },
    },

    grid: {
      show: false,
    },
  };

  const seriesBar = [
    {
      data: dataBarChart.reverse(),
    },
  ];
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
        align: 'center',
        offsetX: 5,
        formatter: (value) => {
          return value.toString().substring(0, 3);
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
        <ChartSC>
          <Loading />
        </ChartSC>
      )}
      {isError && (
        <ChartSC>
          <Error message="Error: Network Error" />
        </ChartSC>
      )}
      {!isError && !loading && (
        <Fragment>
          <Title>Device By Hour</Title>
          <ChartSC>
            <ChartHeatmapSC>
              <Chart
                options={options}
                series={heatmapData}
                type="heatmap"
                height={350}
              />
            </ChartHeatmapSC>
            <BarChartSC>
              <Chart
                options={optionsBar}
                series={seriesBar}
                type="bar"
                height={350}
              />
            </BarChartSC>
            <ColorGradient />
            <NoteNumber>
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
              <span>50</span>
            </NoteNumber>
          </ChartSC>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ChartHeatmap;
