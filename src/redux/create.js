import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './modules/reducer';

/**
 * Create redux store with preloadedState
 * @param api
 * @param preloadedState
 * @returns {Object}
 */
export default function configStore(api, preloadedState) {
  const middleware = [thunk.withExtraArgument({ api })];
  const rootReducer = createRootReducer();

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware.apply(null, middleware)
  );
}
