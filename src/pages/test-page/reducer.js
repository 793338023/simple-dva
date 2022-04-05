const delay = (ms) =>
  new Promise(function (resolve) {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const defaultSate = {
  number: 1,
};

const store = {
  namespace: "test",
  state: defaultSate,
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    },
  },
  effects: {
    *asyncAdd(action, effects) {
      yield effects.call(delay, 1000);
      yield effects.put({ type: "add" });
    },
  },
};

export default store;
