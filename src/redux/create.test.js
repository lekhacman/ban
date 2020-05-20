import configStore from './create';

it('should createStore', function() {
  expect(configStore({}, undefined)).toBeDefined();
});
