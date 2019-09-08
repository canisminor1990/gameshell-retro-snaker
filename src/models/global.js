export default {
  namespace: 'global',
  state: {
    xboxLayout: false,
  },
  reducers: {
    save(state, action) {
      state = action.payload;
      return state;
    },
  },
  effects: {
    *get(action, { call, put }) {
      yield put({
        type: 'save',
        payload: { example: true },
      });
    },
  },
};
