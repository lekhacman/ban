import React from 'react';
import App from './App';
import { THEME } from '../api/theme.store';
import { fireEvent, render } from '@testing-library/react';
import { wait } from '@testing-library/dom';

describe('App', function() {
  it('should render', function() {
    const props = {
      appCtx: {
        store: {
          theme: {
            get: jest.fn().mockReturnValue(THEME.LIGHT),
            set: jest.fn(),
          },
        },
        print: jest.fn(),
      },
    };
    const { getByText } = render(<App {...props} />);
    expect(getByText(/Andrew Le/i)).toBeInTheDocument();
  });

  it('should setTheme', async function() {
    const props = {
      appCtx: {
        store: {
          theme: {
            get: jest.fn().mockReturnValue(THEME.LIGHT),
            set: jest.fn(),
          },
        },
        print: jest.fn(),
      },
    };
    const { getByTestId, container } = render(<App {...props} />);
    /** @type {Element} */
    const appContainer = container.children[0];

    // Theme to be LIGHT by default
    expect(appContainer.className).toEqual('App App--light');

    // Change theme to DARK
    const themeBtn = getByTestId('theme-icon');
    fireEvent.click(themeBtn);

    await wait(function() {
      expect(appContainer.className).toEqual('App App--dark');
    });

    // change back to LIGHT theme
    fireEvent.click(themeBtn);
    await wait(function() {
      expect(appContainer.className).toEqual('App App--light');
    });
  });
});
