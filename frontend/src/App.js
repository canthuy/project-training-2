import { Fragment } from 'react';
import ChartDoughnut from './containers/ChartDonut/ChartDonut';
import ChartRanking from './containers/ChartRanking/ChartRanking';
import ChartHeatmap from './containers/ChartHeatmap/ChartHeatmap';
import LineChart from './containers/LineChart/LineChart';
import DateRange from './containers/DateRange/DateRange';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <Fragment>
      <DateRange />
      <div className='container-chart '>
        <ChartDoughnut />
        <LineChart />
      </div>
      <ChartRanking />
      <ChartHeatmap />
    </Fragment>
  );
}

export default App;
