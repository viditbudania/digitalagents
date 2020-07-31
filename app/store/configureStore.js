import { createStore, applyMiddleware, compose } from 'redux'

import createSagaMiddleware from 'redux-saga'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import * as storage from 'redux-storage';
import reducers from '../reducers'
import { createLogger } from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

export default function configureStore(initialState) {

  const engine = createEngine('AppTree');
  const storeMiddleware = storage.createMiddleware(engine);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    storage.reducer(reducers),
    compose(
      applyMiddleware(
        sagaMiddleware,
        storeMiddleware,
         logger
      ),
    ),
  );

  const load = storage.createLoader(engine);
  load(store)
    .then()
    .catch();
  store.runSaga = sagaMiddleware.run;

  return store;
}