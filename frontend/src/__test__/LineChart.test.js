import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import LineChart from '../containers/LineChart/LineChart';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('LineChart component', () => {
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
      lineChart: {
        deviceData: [],
        loading: true,
        isError: false,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<LineChart />);
    const elements = container.querySelector('div').firstChild;
    expect(container).toMatchSnapshot();
    expect(elements.firstChild.className).toEqual('spinner-border');
  });
  it('get data success', () => {
    mockState = {
      lineChart: {
        deviceData: [
          {
            name: 'Android',
            data: [
              { x: '01/01/2021', y: 4 },
              { x: '02/01/2021', y: 3 },
              { x: '03/01/2021', y: 5 },
            ],
          },
          {
            name: 'iOS',
            data: [
              { x: '01/01/2021', y: 1 },
              { x: '02/01/2021', y: 6 },
              { x: '03/01/2021', y: 4 },
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
    const { container } = render(<LineChart />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/Device/i)).toBeTruthy();
  });
  it('get data error', () => {
    mockState = {
      lineChart: {
        deviceData: [],
        loading: false,
        isError: true,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<LineChart />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Error: Network Error')).toBeTruthy();
  });
});
