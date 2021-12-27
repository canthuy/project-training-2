import { Fragment } from 'react';
import ChartDoughnut from './containers/ChartDonut/ChartDonut';
import ChartRanking from './containers/ChartRanking/ChartRanking';
import ChartHeatmap from './containers/ChartHeatmap/ChartHeatmap';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <Fragment>
      <ChartDoughnut />
      <ChartRanking />
      <ChartHeatmap />
    </Fragment>
  );
}
export default App;
