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
  it('change date range input', () => {
    const { container } = render(<DateRange />);
    expect(container).toMatchSnapshot();
    const inputDate = screen.getByRole('textbox');
    fireEvent.change(inputDate, {
      target: { value: '01/01/2021 - 02/02/2021' },
    });
    expect(inputDate.value).toEqual('01/01/2021 - 02/02/2021');
  });
  it('click ok', () => {
    render(<DateRange />);
    fireEvent.click(screen.getByRole('button', { name: /Ok/i }));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
