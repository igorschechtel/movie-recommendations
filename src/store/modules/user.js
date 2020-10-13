const state = {
  user: {
    isLoggedIn: false,
    name: undefined,
    id: undefined
  },
}

const getters = {
  userIsLoggedIn(state) {
    return state.user.isLoggedIn;
  },

  userId(state) {
    return state.user.id;
  }
};

const  mutations = {
  setUser(state, { name, id }) {
    state.user = { isLoggedIn: true, name, id };
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
  