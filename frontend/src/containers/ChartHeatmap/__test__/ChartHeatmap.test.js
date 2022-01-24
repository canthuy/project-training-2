import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ChartHeatmap from '../ChartHeatmap';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('react-apexcharts', () => 'Chart');
describe('ChartHeatmap component', () => {
  let mockState = {};
  beforeEach(() => {
    useDispatch.mockImplementation(() => () => {});
    useSelector.mockImplementation((callback) => {
      return callback(mockState);
    });
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });
  it('loading data', () => {
    mockState = {
      heatChart: {
        heatmapData: [],
        loading: true,
        isError: false,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<ChartHeatmap />);
    const elements = container.querySelector('div').firstChild;
    expect(container).toMatchSnapshot();
    expect(elements.firstChild.className).toEqual('spinner-border');
  });
  it('get data success', () => {
    mockState = {
      heatChart: {
        heatmapData: [
          {
            name: 'Monday',
            data: [
              { x: '1:00', y: 4 },
              { x: '2:00', y: 3 },
              { x: '3:00', y: 5 },
            ],
          },
          {
            name: 'Tuesday',
            data: [
              { x: '1:00', y: 1 },
              { x: '2:00', y: 6 },
              { x: '3:00', y: 4 },
            ],
          },
        ],
        loading: false,
        isError: false,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const  {container}  = render(<ChartHeatmap />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Device By Hour')).toBeTruthy();
  });
  it('get data error', () => {
    mockState = {
      heatChart: {
        heatmapData: [],
        loading: false,
        isError: true,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<ChartHeatmap />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Error: Network Error')).toBeTruthy();
  });
  
});
