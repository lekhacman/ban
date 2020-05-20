import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import configStore from '../redux/create';

describe('App', function() {
  it('should render', function() {
    const store = configStore({}, undefined);
    const props = { store };
    const { getByText } = render(<App {...props} />);
    expect(getByText(/Weather/i)).toBeInTheDocument();
  });
});
