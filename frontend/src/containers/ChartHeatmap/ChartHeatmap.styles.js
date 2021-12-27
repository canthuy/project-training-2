import styled from 'styled-components';

const ChartSC = styled.div`
  width: 70%;
  margin: 0 20px 20px 20px;
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h5`
  margin: 0;
  margin-left: 30px;
  color: #7a7975;
`;
const ChartHeatmapSC = styled.div`
  width: 85%;
`;
const BarChartSC = styled.div`
  width: 15%;
`;
const ColorGradient = styled.div`
  width: 77%;
  height: 10px;
  margin-left: 14px;
  background-image: linear-gradient(to right, #f7f7f7, #8f6cc8);
`;
const NoteNumber = styled.div`
  width: 78%;
  margin-left: 12px;
  color: #7a7975;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
`;
export {
  ChartSC,
  Title,
  ChartHeatmapSC,
  BarChartSC,
  ColorGradient,
  NoteNumber,
};
