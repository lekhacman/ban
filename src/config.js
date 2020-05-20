/**
 * @constant
 * @type {number} http request timeout in milliseconds
 */
const timeout = 60000;

/**
 * @typedef AppConfig
 */
const config = {
  vendor: {
    metaWeather: {
      url: process.env.REACT_APP_METAWEATHER_URL,
      timeout,
    },
  },
};

export default config;
