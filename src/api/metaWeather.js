/**
 * @typedef {{search: locationSearch, getWeather: getWeather}} weatherApi
 */
import { evolve, map, pipe, prop } from 'ramda';

/**
 * Weather API Constructor
 * @external AxiosStatic
 * @param {Object} config
 * @param {string} config.url
 * @param {number} config.timeout
 * @param {AxiosStatic} http
 * @return {weatherApi}
 */
export default function WeatherApi({ url, timeout }, http) {
  const client = http.create({
    baseURL: `${url}/api/location`,
    timeout,
  });

  /**
   * @typedef {{title: string, location_type: string, woeid: number}} LocationMeta
   * @typedef {{title: string, type: string, id: number}} MyLocationMeta
   */
  /**
   * @typedef locationSearch
   * @param {string} txt
   * @return {Promise<Array<MyLocationMeta>>}
   */
  function search(txt) {
    return client.get(`/search?query=${txt}`).then(
      pipe(
        prop('data'),
        map(loc => ({
          title: loc.title,
          type: loc.location_type,
          id: loc.woeid,
        }))
      )
    );
  }

  /**
   * @typedef {{min_temp: number, max_temp: number, applicable_date: string}} DayWeather
   * @typedef {{consolidated_weather: Array<DayWeather>}} LocationWeather
   * @typedef {{temp: {min: number, max: number}, date: string}} MyDayWeather
   * @typedef {{weather: Array<MyDayWeather>}} MyLocationWeather
   */
  /**
   * @typedef getWeather
   * @param {string|number} locationId
   * @return {Promise<MyLocationWeather>}
   */
  function getWeather(locationId) {
    return client.get(`/${locationId}`).then(
      pipe(
        prop('data'),
        data => ({ weather: data.consolidated_weather }),
        evolve({
          weather: map(day => ({
            date: day.applicable_date,
            temp: { min: day.min_temp, max: day.max_temp },
          })),
        })
      )
    );
  }

  return {
    search,
    getWeather,
  };
}
