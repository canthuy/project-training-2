import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ModalLabel from '../ModalLabel';
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

  it('Show modal label', () => {
    const { container, getByText, getByRole } = render(<ModalLabel />);
    expect(container).toMatchSnapshot();
    const buttonLabel = getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    expect(getByText('Android')).toBeTruthy();
    expect(getByText('Labels')).toBeTruthy();
  });
  it('Click label', () => {
    const { getByText, getByRole, queryAllByTestId } = render(<ModalLabel />);
    const buttonLabel = getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    const label = getByText('Android');
    fireEvent.click(label);
    expect(queryAllByTestId('test-svg')).toHaveLength(5);
    fireEvent.click(label);
    expect(queryAllByTestId('test-svg')).toHaveLength(6);
  });
  it('Hide modal label and do not change labels', () => {
    const { getByRole } = render(<ModalLabel />);
    const buttonLabel = getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    fireEvent.click(document.querySelector('.modal-backdrop'));
    expect(mockDispatch).not.toHaveBeenCalled();
  });
  it('Hide modal label and dispatch label', () => {
    const { getByText, getByRole } = render(<ModalLabel />);
    const buttonLabel = getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    fireEvent.click(getByText('Android'));
    fireEvent.click(getByText('iOS'));
    fireEvent.click(document.querySelector('.modal-backdrop'));
    expect(mockDispatch).toHaveBeenCalled();
  });
  it('hide modal and no device type selected', () => {
    global.alert = jest.fn();
    const { getByText, getByRole } = render(<ModalLabel />);
    const buttonLabel = getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    fireEvent.click(getByText('Android'));
    fireEvent.click(getByText('iOS'));
    fireEvent.click(getByText('Linux'));
    fireEvent.click(getByText('Windows'));
    fireEvent.click(getByText('Os X'));
    fireEvent.click(getByText('Unknown'));
    fireEvent.click(document.querySelector('.modal-backdrop'));
    expect(global.alert).toHaveBeenCalled();
  });
  it('Filter input', () => {
    const { queryByText, getByRole } = render(<ModalLabel />);
    const buttonLabel = getByRole('button', { name: /Labels/i });
    fireEvent.click(buttonLabel);
    const inputFilter = getByRole('textbox');
    fireEvent.change(inputFilter, { target: { value: 'android' } });
    expect(inputFilter.value).toEqual('android');
    expect(queryByText('iOS')).not.toBeTruthy();

    fireEvent.change(inputFilter, { target: { value: '' } });
    expect(queryByText('iOS')).toBeTruthy();
  });
});
