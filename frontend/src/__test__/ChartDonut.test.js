import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ChartDonut from '../containers/ChartDonut/ChartDonut';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('ChartDonut Component', () => {
  let mockAppState = {};
  beforeEach(() => {
    useDispatch.mockImplementation(() => () => {});
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
      deviceData: {},
      loading: true,
      isError: false,
    };
    const { container } = render(<ChartDonut />);
    const elements = container.querySelector('div');
    expect(container).toMatchSnapshot();
    expect(elements.firstChild.className).toEqual('spinner-border');
  });
  it('get data success', () => {
    mockAppState = {
      deviceData: { android: 50, iOS: 50 },
      loading: false,
      isError: false,
    };
    const { container } = render(<ChartDonut />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('canvas')).toBeTruthy();
  });
  it('get data error', () => {
    mockAppState = {
      deviceData: {},
      loading: false,
      isError: true,
    };
    const { container } = render(<ChartDonut />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Error: Network Error')).toBeTruthy();
  });
});
