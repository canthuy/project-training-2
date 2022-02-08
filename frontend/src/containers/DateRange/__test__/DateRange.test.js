import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import DateRange from '../DateRange';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
describe('DateRange component', () => {
  let mockState = {
    datepicker: {
      startDate: '',
      endDate: '',
    },
  };
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => mockDispatch);
    useSelector.mockImplementation((callback) => {
      return callback(mockState);
    });
  });
  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });
  it('change date range and dispatch', () => {
    const { container, getByText, getByRole } = render(<DateRange />);
    getByRole('textbox').focus();
    const newSD = getByText('14');
    const newED = getByText('23');
    fireEvent.click(newSD);
    fireEvent.click(newED);
    expect(getByRole('textbox').value).toEqual(
      '14/01/2022 - 23/01/2022'
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(getByRole('button', { name: /ok/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });
  it('newStartDate, newEndDate is null', () => {
    const { getByRole } = render(<DateRange />);
    getByRole('textbox').focus();
    fireEvent.click(getByRole('button', { name: /ok/i }));
    expect(mockDispatch).not.toHaveBeenCalled();
  });
  it('startDate, endDate not null and do not change date range', () => {
    mockState = {
      datepicker: {
        startDate: '08/01/2022',
        endDate: '25/01/2022',
      },
    };
    const { getByText, getByRole } = render(<DateRange />);
    getByRole('textbox').focus();
    const newSD = getByText('8');
    const newED = getByText('25');
    fireEvent.click(newSD);
    fireEvent.click(newED);
    fireEvent.click(getByRole('button', { name: /ok/i }));
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
