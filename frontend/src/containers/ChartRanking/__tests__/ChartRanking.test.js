import React from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ChartRanking from '../ChartRanking';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('ChartRanking Component', () => {
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
  it('Loading data', () => {
    mockAppState = {
      ranking: {
        rankingData: [],
        loading: true,
        isError: false,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<ChartRanking />);
    expect(container).toMatchSnapshot();
    const element = container.querySelector('div').firstChild;
    expect(element.firstChild.className).toEqual('spinner-border');
  });
  it('get data success', () => {
    mockAppState = {
      ranking: {
        rankingData: [
          { label: 'Day 1', value: 10 },
          { label: 'Day 2', value: 4 },
          { label: 'Day 3', value: 3 },
        ],
        loading: false,
        isError: false,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container } = render(<ChartRanking />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('get data error', () => {
    mockAppState = {
      ranking: {
        rankingData: [],
        loading: false,
        isError: true,
      },
      datepicker: {
        startDate: '01/01/2021',
        endDate: '01/02/2021',
      },
    };
    const { container, getByText } = render(<ChartRanking />);
    expect(container).toMatchSnapshot();
    expect(getByText('Error: Network Error')).toBeTruthy();
  });
});
