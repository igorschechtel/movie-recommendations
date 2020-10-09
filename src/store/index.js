import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false,
      name: undefined,
      id: undefined
    }
  },

  mutations: {
    setUser(state, user) {
      const { isLoggedIn, name, id } = user;
      if (isLoggedIn !== undefined)
        Vue.set(state.user, "isLoggedIn", isLoggedIn);
      if (name !== undefined) Vue.set(state.user, "name", name);
      if (id !== undefined) Vue.set(state.user, "id", id);
    }
  },

  actions: {}
});
