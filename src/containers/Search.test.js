import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Search } from './Search';

describe('Search Container', function() {
  it('should render', function() {
    const props = {
      txt: '',
      locations: [],
      query: jest.fn(),
      updateQuery: jest.fn(),
      onClearSuggestion: jest.fn(),
      submit: jest.fn(),
    };
    const search = render(<Search {...props} />);
    expect(search).toBeDefined();
  });

  it('should handle user input', function(done) {
    const props = {
      txt: '',
      locations: [],
      query: jest.fn(),
      updateQuery: jest.fn(),
      onClearSuggestion: jest.fn(),
      submit: jest.fn(),
    };
    const { getByPlaceholderText } = render(<Search {...props} />);
    const query = getByPlaceholderText('Search');

    fireEvent.change(query, { target: { value: 'Singa' } });
    fireEvent.change(query, { target: { value: 'Singapura' } });

    setTimeout(function() {
      expect(props.updateQuery).toHaveBeenCalledWith('Singapura');
      done();
    }, 1000);
  });

  it('should show suggestions', function() {
    const props = {
      txt: 'sing',
      locations: [{ title: 'Singapura', id: 123 }],
      query: jest.fn(),
      updateQuery: jest.fn(),
      onClearSuggestion: jest.fn(),
      submit: jest.fn(),
    };
    const { getByText, getByPlaceholderText } = render(<Search {...props} />);
    const query = getByPlaceholderText('Search');

    query.focus();

    const suggestion = getByText(/singapura/i);
    expect(suggestion).toBeInTheDocument();

    suggestion.click();

    expect(props.submit).toHaveBeenCalledWith(123);
  });
});
