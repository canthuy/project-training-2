import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getData } from "../redux/actions";
Chart.register(ArcElement);

const ChartDoughnut = () => {
  const deviceData = useSelector((state) => state.deviceData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };
  const data = {
    labels: ["iOS", "Android"],
    datasets: [
      {
        data: [deviceData.iOS, deviceData.android],
        backgroundColor: ["#48c0b0", "#925de2"],
        hoverBackgroundColor: ["#48c0b0", "#925de2"],
      },
    ],
  };
  return (
    <div style={{ width: 20 + "%", margin: 10 }}>
      <h2>Device Type</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};
export default ChartDoughnut;
