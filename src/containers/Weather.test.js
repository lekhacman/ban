import React from 'react';
import { render } from '@testing-library/react';
import { Weather } from './Weather';

describe('Weather Container', function() {
  it('should render', function() {
    const props = {
      err: '',
      isFetching: false,
      days: [],
    };
    const weather = render(<Weather {...props} />);
    expect(weather).toBeDefined();
  });

  it('should render days', function() {
    const props = {
      err: '',
      isFetching: false,
      days: [{ date: 'Friday', temp: { min: 2, max: 3 } }],
    };
    const { getByText } = render(<Weather {...props} />);
    expect(getByText(/friday/i)).toBeInTheDocument();
    expect(getByText(/Min: 2/i)).toBeInTheDocument();
  });

  it('should render error', function() {
    const props = {
      err: 'Oops!',
      isFetching: false,
      days: [],
    };
    const { getByText } = render(<Weather {...props} />);
    expect(getByText(/oops/i)).toBeInTheDocument();
  });

  it('should show loading', function() {
    const props = {
      err: '',
      isFetching: true,
      days: [],
    };
    const { getByText } = render(<Weather {...props} />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
});
