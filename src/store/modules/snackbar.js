const state = {
  show: false,
  bgColor: 'error',
  isDark: true,
  text: '',
};

const getters = {
  showSnackbar(state) {
    return state.show;
  },
  snackProps(state) {
    return {
      bgColor: state.bgColor,
      isDark: state.isDark,
      text: state.text,
    };
  },
};

const mutations = {
  showSnackbar(state, options) {
    const { bgColor, isDark, text } = options;
    state.show = true;
    state.bgColor = bgColor || state.bgColor;
    state.isDark = isDark || state.isDark;
    state.text = text || state.text;
  },

  hideSnackbar(state) {
    state.show = false;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
