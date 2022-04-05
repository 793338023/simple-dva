import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import SagaManager from "./SagaManager";
import { getReducer, prefixResolve, getSagas } from "./get";

export { Provider, connect } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

let storeEnhancers = [];
let composeEnhancers;

try {
  if (isDev) {
    if (window.devToolsExtension) {
      storeEnhancers.push(window.devToolsExtension());
    }
    composeEnhancers =
      isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25,
            shouldHotReload: false,
          })
        : compose;
  }
} catch (err) {
  alert(err);
}

export const staticReducers = {
  staticCommon(state = "", action) {
    switch (action.type) {
      case "CREATEACCOUNT_CLEAR": {
        return "createaccount_clear";
      }
      default:
        return state;
    }
  },
};

const configureStore = (function () {
  let store;

  let app = {
    _models: [],
    model(m) {
      let prefixmodel = prefixResolve(m);
      this._models.push(prefixmodel);
    },
    create(initialState = {}) {
      const reducers = getReducer(app);
      let sagas = getSagas(app);
      store = createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
      );
      // run sagas
      SagaManager.set(sagas).startSagas(sagaMiddleware);
      return store;
    },
    replace() {
      const reducers = getReducer(app);
      let sagas = getSagas(app);
      store.replaceReducer(reducers);
      SagaManager.set(sagas).startSagas(sagaMiddleware);
    },
    reset(action) {
      action && store.dispatch(action);
      this.replace(staticReducers, []);
    },
  };

  return app;
})();

export default configureStore;
