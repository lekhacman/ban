// Actions
import { lensProp, map, over, pipe, take } from 'ramda';
import moment from 'moment';

export const QUERY = 'ban/weather/QUERY';
export const SUGGEST = 'ban/weather/SUGGEST';
export const CLEAR_LOCATIONS = 'ban/weather/CLEAR_LOCATIONS';
export const FETCH_SUCCESS = 'ban/weather/FETCH_SUCCESS';
export const FETCH_ERROR = 'ban/weather/FETCH_ERROR';
export const FETCHING = 'ban/weather/FETCHING';

// Reducer
/**
 * @typedef {{search: string, locations: Array<MyLocationMeta>, isFetching: boolean, err: string, days: Array}} WeatherState
 */
const initState = {
  search: '',
  locations: [],
  isFetching: false,
  err: '',
  days: [],
};
/**
 *
 * @param {WeatherState} state
 * @param {{type: string}} action
 * @return {WeatherState}
 */
export default function reducer(state = initState, action) {
  const handler = {
    [QUERY]: () => ({ ...state, search: action.search }),
    [SUGGEST]: handleQuery,
    [CLEAR_LOCATIONS]: () => ({ ...state, locations: [] }),
    [FETCHING]: () => ({ ...state, isFetching: true, err: '', days: [] }),
    [FETCH_SUCCESS]: handleFetchSuccess,
    [FETCH_ERROR]: handleFetchError,
  };

  return handler.hasOwnProperty(action.type) ? handler[action.type]() : state;

  function handleQuery() {
    return {
      ...state,
      ...action.data,
    };
  }

  function handleFetchSuccess() {
    return {
      ...state,
      isFetching: false,
      err: '',
      days: action.data.weather,
    };
  }

  function handleFetchError() {
    return {
      ...state,
      isFetching: false,
      err: action.err.message,
      days: [],
    };
  }
}

// Action Creators
export function search(search) {
  return dispatch => dispatch({ type: QUERY, search });
}
export function query(txt) {
  return function(dispatch, getState, { api }) {
    if (txt) {
      api.weather.search(txt).then(
        locations => dispatch({ type: SUGGEST, data: { locations } }),
        () => dispatch({ type: SUGGEST, data: { locations: [] } })
      );
    }
  };
}

export function clearLocations() {
  return dispatch => dispatch({ type: CLEAR_LOCATIONS });
}

export function submit(locationId) {
  return function(dispatch, getState, { api }) {
    dispatch({ type: FETCHING });
    api.weather.getWeather(locationId).then(
      pipe(
        over(
          lensProp('weather'),
          pipe(
            map(
              over(lensProp('date'), date =>
                moment(date, 'YYYY-MM-DD').format('dddd')
              )
            ),
            take(5)
          )
        ),
        data => dispatch({ type: FETCH_SUCCESS, data })
      ),
      err => dispatch({ type: FETCH_ERROR, err })
    );
  };
}
