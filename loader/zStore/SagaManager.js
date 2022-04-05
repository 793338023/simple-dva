import { take, fork, cancel, all } from "redux-saga/effects";

function* rootSaga() {
  yield all([]);
}

export const CANCEL_SAGAS_HMR = "CANCEL_SAGAS_HMR";

function createAbortableSaga(saga) {
  if (process.env.NODE_ENV === "development") {
    return function* main() {
      const sagaTask = yield fork(saga);

      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  } else {
    return saga;
  }
}

class SagaManager {
  sagas = [];
  sagaTasks = [];
  set(ns = []) {
    this.sagas = [...ns, rootSaga];
    return this;
  }
  startSagas(sagaMiddleware) {
    this.sagaTasks.map((sagaTask) => {
      sagaTask.cancel();
    });
    this.sagaTasks = this.sagas
      .map(createAbortableSaga)
      .map((saga) => sagaMiddleware.run(saga));
  }
  cancelSagas(store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR,
    });
  }
}

export default new SagaManager();
