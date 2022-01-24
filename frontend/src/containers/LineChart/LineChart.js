import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { ChartSC, Title } from './LineChart.styles';
import { getData } from '../../redux/lineChart/actions';
import { handleData } from './helper';
import './LineChart.css';

const LineChart = () => {
  const { deviceData, loading, isError } = useSelector(
    (state) => state.lineChart
  );
  const { startDate, endDate } = useSelector((state) => state.datepicker);
  const dispatch = useDispatch();
  const groupData = ['Day', 'Week', 'Month'];
  const [isActive, setIsActive] = useState(0);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    dispatch(getData([startDate, endDate]));
  }, [startDate, endDate]);
  useEffect(() => {
    setSeries(deviceData);
    setIsActive(0);
  }, [deviceData]);
  const totalData = useMemo(() => {
    const total = deviceData.map((val) =>
      val.data.reduce((acc, val) => acc + val.y, 0)
    );
    return total;
  }, [deviceData]);
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        speed: 1000,
        easing: 'easein',
      },
    },
    legend: {
      show: true,
      horizontalAlign: 'left',
      markers: {
        width: 16,
        height: 10,
        radius: 4,
      },
      itemMargin: {
        horizontal: 10,
      },
      formatter: (seriesName, opts) =>
        seriesName + ' ' + totalData[opts.seriesIndex],
    },
    stroke: {
      width: 4,
    },
    colors: ['#925de2', '#48c0b0'],
  };
  const handleClick = useCallback(
    (index) => {
      setIsActive(index);
      if (index === 0) {
        setSeries(deviceData);
      }
      if (index === 1) {
        const newSeries = handleData(deviceData, 'WW');
        setSeries(newSeries);
      }
      if (index === 2) {
        const newSeries = handleData(deviceData, 'MM/YYYY');
        setSeries(newSeries);
      }
    },
    [deviceData]
  );
  return (
    <>
      <ChartSC>
        {loading && <Loading />}
        {isError && <Error message="Error: Network Error" />}
        {!loading && !isError && (
          <Fragment>
            <div className="data-group">
              <Title>Device</Title>
              <div>
                {groupData.map((val, index) => {
                  return (
                    <span
                      key={index}
                      style={{ opacity: isActive === index ? 1 : 0.3 }}
                      onClick={() => handleClick(index)}
                    >
                      {val}
                    </span>
                  );
                })}
              </div>
            </div>
            <Chart options={options} series={series} type="line" height={404} />
          </Fragment>
        )}
      </ChartSC>
    </>
  );
};

export default LineChart;
