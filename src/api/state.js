/**
 * @typedef {{set: function(Object), get: function: Object, clear: function}} stateApi
 */
/**
 * State API constructor
 * @param {Window} _window
 * @return {stateApi}
 */
export default function StateApi(_window) {
  const key = 'state';
  /** @type {Storage} */
  const storage = _window.localStorage;

  function get() {
    try {
      const data = storage.getItem(key);
      return data ? JSON.parse(data) : undefined;
    } catch (e) {
      _window.console.error(e);
    }
  }

  function set(data) {
    storage.setItem(key, JSON.stringify(data));
  }

  function clear() {
    storage.removeItem(key);
  }
  return { get, set, clear };
}
