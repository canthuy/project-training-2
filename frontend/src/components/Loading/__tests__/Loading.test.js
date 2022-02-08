import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';
window.React = React;

describe('Loading component', () => {
  it('render component', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
