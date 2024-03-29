import React from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ChartDonut from '../ChartDonut';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('ChartDonut Component', () => {
  let mockAppState = {};
  beforeEach(() => {
    useDispatch.mockImplementation(() => () => { });
    useSelector.mockImplementation((callback) => {
      return callback(mockAppState);
    });
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });
  it('loading data', () => {
    mockAppState = {
      device: {
        deviceData: [],
        loading: true,
        isError: false,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<ChartDonut />);
    const elements = container.querySelector('div').firstChild;
    expect(container).toMatchSnapshot();
    expect(elements.firstChild.className).toEqual('spinner-border');
  });
  it('get data success', () => {
    mockAppState = {
      device: {
        deviceData: [
          { x: 'Android', y: 50 },
          { x: 'iOS', y: 50 },
        ],
        loading: false,
        isError: false,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<ChartDonut />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('canvas')).toBeTruthy();
  });
  it('get data error', () => {
    mockAppState = {
      device: {
        deviceData: [],
        loading: false,
        isError: true,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container, getByText } = render(<ChartDonut />);
    expect(container).toMatchSnapshot();
    expect(getByText('Error: Network Error')).toBeTruthy();
  });
});
