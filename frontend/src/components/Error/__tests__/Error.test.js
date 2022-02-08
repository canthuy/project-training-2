import React from 'react';
import { render } from '@testing-library/react';
import Error from '../Error';
window.React = React;

describe('Error Component', () => {
  it('render component', () => {
    const { container, getByText } = render(<Error message="error" />);
    expect(container).toMatchSnapshot();
    expect(getByText(/error/i)).toBeTruthy();
  });
});
