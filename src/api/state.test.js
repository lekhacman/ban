import StateApi from './state';

describe('State API', function() {
  const state = { name: 'andrew' };
  let _window;
  let stateApi;

  beforeEach(function() {
    _window = {
      localStorage: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      console: {
        error: jest.fn(),
      },
    };
    stateApi = StateApi(_window);
  });

  it('should save string object', function() {
    stateApi.set(state);
    expect(_window.localStorage.setItem).toHaveBeenCalledWith(
      'state',
      '{"name":"andrew"}'
    );
  });
  it('getState should parse string object', function() {
    _window.localStorage.getItem.mockReturnValueOnce('{"name":"andrew"}');
    expect(stateApi.get()).toEqual(state);
  });

  // this is because of Redux createStore's param requirement
  it('getState should return undefined instead of null', function() {
    _window.localStorage.getItem.mockReturnValueOnce(null);
    expect(stateApi.get()).toEqual(undefined);
  });

  it('getState should handle invalid object state', function() {
    _window.localStorage.getItem.mockReturnValueOnce('Object');
    expect(stateApi.get()).toEqual(undefined);
  });

  it('should clear state', function() {
    stateApi.clear();
    expect(_window.localStorage.removeItem).toHaveBeenCalledWith('state');
  });
});
