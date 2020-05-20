import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { Provider } from 'react-redux';
import Weather from '../containers/Weather';
import Search from '../containers/Search';

export default function App({ store }) {
  return (
    <Provider store={store}>
      <div className="App App--light">
        <header>
          <h1>Weather</h1>
        </header>
        <main>
          <Search />
          <Weather />
        </main>
      </div>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object,
};
