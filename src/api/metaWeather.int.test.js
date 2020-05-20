import axios from 'axios';
import WeatherApi from './metaWeather';
import config from '../config';

describe('Weather API Integration', function() {
  /** @type {weatherApi} */
  const api = WeatherApi(config.vendor.metaWeather, axios);

  it('should query London', async function() {
    const locations = await api.search('London');

    expect(locations[0].title).toEqual('London');
    expect(locations[0].type).toEqual('City');
    expect(locations[0].id).toEqual(44418);
  });
});
