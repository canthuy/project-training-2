import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { ChartSC, Title } from './LineChart.styles';
import { getData } from '../../redux/lineChart/actions';
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
  const totalData = deviceData.map((val) =>
    val.data.reduce((acc, val) => acc + val.y, 0)
  );
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
  const handleClick = (index) => {
    setIsActive(index);
    if (index === 0) {
      setSeries(deviceData);
    }
    if (index === 1) {
      const newSeries = deviceData.map((val) => {
        const weekData = val.data.map((v) => {
          return {
            x: moment(v.x, 'DD/MM/YYYY').format('WW'),
            y: v.y,
          };
        });
        let obj = {};
        const newData = weekData.reduce((acc, val) => {
          if (!obj[val.x]) {
            obj[val.x] = val;
            acc.push(obj[val.x]);
          } else {
            obj[val.x].y += val.y;
          }
          return acc;
        }, []);
        return {
          name: val.name,
          data: newData,
        };
      });
      setSeries(newSeries);
    }
    if (index === 2) {
      const newSeries = deviceData.map((val) => {
        const monthData = val.data.map((v) => ({
          x: moment(v.x, 'DD/MM/YYYY').format('MM/YYYY'),
          y: v.y,
        }));
        let obj = {};
        const newData = monthData.reduce((acc, val) => {
          if (!obj[val.x]) {
            obj[val.x] = val;
            acc.push(obj[val.x]);
          } else {
            obj[val.x].y += val.y;
          }
          return acc;
        }, []);
        return {
          name: val.name,
          data: newData,
        };
      });
      setSeries(newSeries);
    }
  };
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
