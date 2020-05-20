import configStore from './create';
import { createBrowserHistory } from 'history';

it('should createStore', function() {
  expect(configStore(createBrowserHistory())).toBeDefined();
});
