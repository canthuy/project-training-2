import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ModalLabel from '../containers/ChartDonut/ModalLabel';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('ModalLabel component', () => {
  const mockState = {
    device: {
      deviceData: [
        { x: 'Android', y: 20 },
        { x: 'Windows', y: 30 },
        { x: 'iOS', y: 60 },
        { x: 'Os X', y: 40 },
        { x: 'Unknown', y: 10 },
        { x: 'Linux', y: 50 },
      ],
      loading: false,
      isError: false,
    },
    datepicker: {
      startDate: '01/01/2021',
      endDate: '01/02/2021',
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

  it('Show modal label', () => {
    const { container } = render(<ModalLabel />);
    expect(container).toMatchSnapshot();
    const buttonLabel = screen.getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    expect(screen.getByText('Android')).toBeTruthy();
    expect(screen.getByText('Labels')).toBeTruthy();
  });
  it('Click label', ()=>{
    render(<ModalLabel />);
    const buttonLabel = screen.getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    const label = screen.getByText('Android');
    fireEvent.click(label);
    expect(screen.queryAllByTestId('test-svg')).toHaveLength(5);
    fireEvent.click(label);
    expect(screen.queryAllByTestId('test-svg')).toHaveLength(6);
  });
  it('Hide modal label and dispatch label', ()=>{
    render(<ModalLabel />);
    const buttonLabel = screen.getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    expect(screen.queryAllByTestId('test-svg')).toHaveLength(6);
    fireEvent.click(document.querySelector('.modal-backdrop'));
    expect(document.querySelector('.show')).not.toBeTruthy();
  });
  it('Filter input', ()=>{
    render(<ModalLabel />);
    const buttonLabel = screen.getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    const inputFilter = screen.getByRole('textbox');
    fireEvent.change(inputFilter, {target: {value: 'android'}});
    expect(inputFilter.value).toEqual('android');
    expect(screen.queryByText('iOS')).not.toBeTruthy();

    fireEvent.change(inputFilter, {target: {value: ''}});
    expect(screen.queryByText('iOS')).toBeTruthy();
  });
});
