import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configStore from './redux/create';
import StateApi from './api/state';
import WeatherApi from './api/metaWeather';
import config from './config';

// Bootstrap
/**
 * @typedef {{state: stateApi, weather: weatherApi}} API
 * @type {API}
 */
const api = {
  state: StateApi(window),
  weather: WeatherApi(config.vendor.metaWeather, axios),
};
const preloadedState = api.state.get();
const store = configStore(api, preloadedState);

// Hooray
ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
