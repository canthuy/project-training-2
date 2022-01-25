import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    const {container} = render(<DateRange />);
    screen.getByRole('textbox').focus();
    const newSD = screen.getByText('14');
    const newED = screen.getByText('23');
    fireEvent.click(newSD);
    fireEvent.click(newED);
    expect(screen.getByRole('textbox').value).toEqual(
      '14/01/2022 - 23/01/2022'
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });
  it('newStartDate, newEndDate is null', () => {
    render(<DateRange />);
    screen.getByRole('textbox').focus();
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(mockDispatch).not.toHaveBeenCalled();
  });
  it('startDate, endDate not null and do not change date range', () => {
    mockState = {
      datepicker: {
        startDate: '08/01/2022',
        endDate: '25/01/2022',
      },
    };
    render(<DateRange />);
    screen.getByRole('textbox').focus();
    const newSD = screen.getByText('8');
    const newED = screen.getByText('25');
    fireEvent.click(newSD);
    fireEvent.click(newED);
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
