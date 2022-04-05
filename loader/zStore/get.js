import { combineReducers } from "redux";
import * as sagaEffects from "redux-saga/effects";

function prefix(obj, namespace) {
  return Object.keys(obj).reduce((prev, next) => {
    //prev收集，next是每个函数名
    let newkey = namespace + "/" + next;
    prev[newkey] = obj[next];
    return prev;
  }, {});
}
export function prefixResolve(model) {
  if (model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace);
  }
  if (model.effects) {
    model.effects = prefix(model.effects, model.namespace);
  }
  return model;
}

export function getReducer(app) {
  let reducers = {};
  for (let m of app._models) {
    //m是每个model的配置
    reducers[m.namespace] = function (state = m.state, action) {
      //组织每个模块的reducer
      let everyreducers = m.reducers; //reducers的配置对象，里面是函数
      let reducer = everyreducers[action.type]; //相当于以前写的switch
      if (reducer) {
        return reducer(state, action);
      }
      return state;
    };
  }
  return combineReducers(reducers); //reducer结构{reducer1:fn,reducer2:fn}
}

export function getSagas(app) {
  let sagas = [];
  for (let m of app._models) {
    sagas.push(function* () {
      for (const key in m.effects) {
        //key就是每个函数名
        const watcher = getWatcher(key, m.effects[key], m);
        yield sagaEffects.fork(watcher); //用fork不会阻塞
      }
    });
  }
  return sagas;
}

function prefixType(type, model) {
  return model.namespace + "/" + type;
}

function getWatcher(key, effect, model) {
  function put(action) {
    return sagaEffects.put({ ...action, type: prefixType(action.type, model) });
  }

  return function* () {
    yield sagaEffects.takeEvery(key, function* (action) {
      //对action进行监控,调用下面这个saga
      yield effect(action, { ...sagaEffects, put });
    });
  };
}
