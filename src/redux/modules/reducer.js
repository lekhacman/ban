import { combineReducers } from 'redux';
import weather from './weather';

/**
 * @typedef {{weather: WeatherState}} RootState
 */

function createRootReducer() {
  return combineReducers({
    weather,
  });
}
export default createRootReducer;
